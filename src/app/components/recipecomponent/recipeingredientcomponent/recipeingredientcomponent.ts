
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipeDTO } from '../../../models/RecipeDTO';
import { IngredientDTO } from '../../../models/IngredientDTO';
import { RecipeIngredientDTO } from '../../../models/RecipeIngredientDTO';

import { Recipeservice } from '../../../services/recipeservice';
import { Ingredientservice } from '../../../services/ingredientservice';
import { Countryservice } from '../../../services/countryservice';
import { Recipeingredientservice } from '../../../services/recipeingredientservice';

interface IngredienteAsignado extends RecipeIngredientDTO {
  nombreIngrediente: string;
  categoriaIngrediente: string;
}

@Component({
  selector: 'app-recipeingredientcomponent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipeingredientcomponent.html',
  styleUrl: './recipeingredientcomponent.css'
})
export class Recipeingredientcomponent implements OnInit {

  idRecipe: number = 0;

  receta: RecipeDTO | null = null;
  paisNombre: string = '';

  ingredientesDisponibles: IngredientDTO[] = [];
  ingredientesAsignados: IngredienteAsignado[] = [];

  ingredienteSeleccionado: number | null = null;
  cantidadSolicitada: number = 1;

  editandoId: number | null = null;
  cantidadEdicion: number = 1;

  cargando: boolean = true;
  guardando: boolean = false;
  eliminando: boolean = false;

  mensaje: string = '';
  tipoMensaje: 'success' | 'error' = 'success';

  // Confirmación personalizada
  confirmandoEliminacion: boolean = false;
  ingredientePorEliminar: IngredienteAsignado | null = null;

  // Control de carga independiente
  private catalogoCargado: boolean = false;
  private relacionesCargadas: boolean = false;
  private relacionesRecibidas: RecipeIngredientDTO[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: Recipeservice,
    private ingredientService: Ingredientservice,
    private countryService: Countryservice,
    private recipeIngredientService: Recipeingredientservice,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.idRecipe = Number(this.route.snapshot.paramMap.get('idRecipe'));

    if (!this.idRecipe || isNaN(this.idRecipe)) {
      this.mostrarMensaje('El identificador de la receta no es válido.', 'error');
      return;
    }

    // Las consultas se ejecutan en paralelo.
    this.obtenerReceta();
    this.obtenerIngredientesDisponibles();
    this.obtenerIngredientesAsignados();
  }

  // Obtener información de la receta
  obtenerReceta(): void {

    this.recipeService.listId(this.idRecipe).subscribe({
      next: (data) => {
        this.receta = data;
        this.obtenerNombrePais(data.idCountry);
        this.cdr.detectChanges();
      },
      error: () => {
        this.mostrarMensaje(
          'No se pudo cargar la información de la receta.',
          'error'
        );
      }
    });
  }

  // Obtener el nombre del país
  obtenerNombrePais(idCountry: number): void {

    this.countryService.getcountries().subscribe({
      next: (data) => {
        const pais = data.find(p => p.idCountry === idCountry);
        this.paisNombre = pais?.nomCountry || 'País no disponible';
        this.cdr.detectChanges();
      },
      error: () => {
        this.paisNombre = 'País no disponible';
        this.cdr.detectChanges();
      }
    });
  }

  // Obtener catálogo de ingredientes
  obtenerIngredientesDisponibles(): void {

    this.ingredientService.getIngredient().subscribe({
      next: (data) => {
        this.ingredientesDisponibles = data;
        this.catalogoCargado = true;

        this.actualizarListaLocal();
      },
      error: () => {
        this.mostrarMensaje(
          'No se pudo cargar el catálogo de ingredientes.',
          'error'
        );
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Obtener relaciones de ingredientes de esta receta
  obtenerIngredientesAsignados(): void {

    this.cargando = true;
    this.cdr.detectChanges();

    this.recipeIngredientService.getByRecipe(this.idRecipe).subscribe({
      next: (data) => {
        this.relacionesRecibidas = data;
        this.relacionesCargadas = true;

        this.actualizarListaLocal();
      },
      error: () => {
        this.cargando = false;

        this.mostrarMensaje(
          'No se pudieron cargar los ingredientes asignados.',
          'error'
        );

        this.cdr.detectChanges();
      }
    });
  }

  // Construir la tabla cuando estén disponibles ambas consultas
  private actualizarListaLocal(): void {

    if (!this.catalogoCargado || !this.relacionesCargadas) {
      return;
    }

    this.ingredientesAsignados = this.relacionesRecibidas.map(relacion =>
      this.convertirRelacion(relacion)
    );

    this.cargando = false;
    this.cdr.detectChanges();
  }

  // Convertir relación del backend a elemento visible
  private convertirRelacion(
    relacion: RecipeIngredientDTO
  ): IngredienteAsignado {

    const ingrediente = this.ingredientesDisponibles.find(
      i => i.idIngredient === relacion.ingredientId
    );

    return {
      ...relacion,
      nombreIngrediente: ingrediente?.nomIngredient
        || `Ingrediente #${relacion.ingredientId}`,
      categoriaIngrediente: ingrediente?.ingredientCategory || ''
    };
  }

  // Agregar ingrediente a la receta
  agregarIngrediente(): void {

    if (this.guardando) {
      return;
    }

    if (!this.ingredienteSeleccionado) {
      this.mostrarMensaje('Selecciona un ingrediente.', 'error');
      return;
    }

    if (
      !this.cantidadSolicitada ||
      this.cantidadSolicitada < 1 ||
      !Number.isInteger(Number(this.cantidadSolicitada))
    ) {
      this.mostrarMensaje(
        'La cantidad debe ser un número entero como mínimo de 1.',
        'error'
      );
      return;
    }

    const ingredienteId = this.ingredienteSeleccionado;
    const cantidad = Number(this.cantidadSolicitada);

    const yaExiste = this.ingredientesAsignados.some(
      i => i.ingredientId === ingredienteId
    );

    if (yaExiste) {
      this.mostrarMensaje(
        'Este ingrediente ya está asignado a la receta. Puedes editar su cantidad.',
        'error'
      );
      return;
    }

    const dto: RecipeIngredientDTO = {
      recipeId: this.idRecipe,
      ingredientId: ingredienteId,
      requestedQuantity: cantidad
    };

    this.guardando = true;
    this.cdr.detectChanges();

    this.recipeIngredientService.insert(dto).subscribe({
      next: (respuesta) => {

        this.guardando = false;
        this.ingredienteSeleccionado = null;
        this.cantidadSolicitada = 1;

        const relacionCreada: RecipeIngredientDTO = {
          ...respuesta,
          recipeId: respuesta?.recipeId ?? this.idRecipe,
          ingredientId: respuesta?.ingredientId ?? ingredienteId,
          requestedQuantity: respuesta?.requestedQuantity ?? cantidad
        };

        // Si el backend devuelve el ID, actualizamos la tabla
        // inmediatamente sin volver a consultar toda la lista.
        if (relacionCreada.idRecipeIngredient) {

          this.ingredientesAsignados = [
            ...this.ingredientesAsignados,
            this.convertirRelacion(relacionCreada)
          ];

          this.mostrarMensaje(
            'Ingrediente agregado correctamente.',
            'success'
          );

        } else {
          // Si la respuesta no trae el ID, consultamos para recuperarlo.
          this.obtenerIngredientesAsignados();

          this.mostrarMensaje(
            'Ingrediente agregado correctamente.',
            'success'
          );
        }

        this.cdr.detectChanges();
      },
      error: (err) => {

        this.guardando = false;

        this.mostrarMensaje(
          err.error?.message || 'No se pudo agregar el ingrediente.',
          'error'
        );

        this.cdr.detectChanges();
      }
    });
  }

  // Iniciar edición
  iniciarEdicion(ingrediente: IngredienteAsignado): void {

    this.editandoId = ingrediente.idRecipeIngredient ?? null;
    this.cantidadEdicion = ingrediente.requestedQuantity;

    this.cdr.detectChanges();
  }

  // Cancelar edición
  cancelarEdicion(): void {

    this.editandoId = null;
    this.cantidadEdicion = 1;

    this.cdr.detectChanges();
  }

  // Guardar nueva cantidad
  guardarEdicion(ingrediente: IngredienteAsignado): void {

    if (!ingrediente.idRecipeIngredient) {
      return;
    }

    if (
      !this.cantidadEdicion ||
      this.cantidadEdicion < 1 ||
      !Number.isInteger(Number(this.cantidadEdicion))
    ) {
      this.mostrarMensaje(
        'La cantidad debe ser un número entero como mínimo de 1.',
        'error'
      );
      return;
    }

    const nuevaCantidad = Number(this.cantidadEdicion);

    const dto: RecipeIngredientDTO = {
      idRecipeIngredient: ingrediente.idRecipeIngredient,
      recipeId: this.idRecipe,
      ingredientId: ingrediente.ingredientId,
      requestedQuantity: nuevaCantidad
    };

    this.recipeIngredientService.update(dto).subscribe({
      next: () => {

        // Actualizar solamente la fila modificada.
        this.ingredientesAsignados = this.ingredientesAsignados.map(item =>
          item.idRecipeIngredient === ingrediente.idRecipeIngredient
            ? { ...item, requestedQuantity: nuevaCantidad }
            : item
        );

        this.editandoId = null;
        this.cantidadEdicion = 1;

        this.mostrarMensaje(
          'Cantidad actualizada correctamente.',
          'success'
        );

        this.cdr.detectChanges();
      },
      error: (err) => {

        this.mostrarMensaje(
          err.error?.message || 'No se pudo actualizar la cantidad.',
          'error'
        );

        this.cdr.detectChanges();
      }
    });
  }

  // Abrir confirmación de eliminación
  eliminarIngrediente(ingrediente: IngredienteAsignado): void {

    this.ingredientePorEliminar = ingrediente;
    this.confirmandoEliminacion = true;

    this.cdr.detectChanges();
  }

  // Cancelar eliminación
  cancelarEliminacion(): void {

    if (this.eliminando) {
      return;
    }

    this.confirmandoEliminacion = false;
    this.ingredientePorEliminar = null;

    this.cdr.detectChanges();
  }

  // Confirmar eliminación
  confirmarEliminacion(): void {

    if (
      !this.ingredientePorEliminar?.idRecipeIngredient ||
      this.eliminando
    ) {
      return;
    }

    const id = this.ingredientePorEliminar.idRecipeIngredient;

    this.eliminando = true;
    this.confirmandoEliminacion = false;
    this.ingredientePorEliminar = null;

    this.mostrarMensaje('Eliminando ingrediente...', 'success');
    this.cdr.detectChanges();

    this.recipeIngredientService.delete(id).subscribe({
      next: () => {

        this.eliminando = false;

        // Quitar inmediatamente la fila eliminada de la pantalla.
        this.ingredientesAsignados = this.ingredientesAsignados.filter(
          item => item.idRecipeIngredient !== id
        );

        this.mostrarMensaje(
          'Ingrediente eliminado correctamente.',
          'success'
        );

        this.cdr.detectChanges();
      },
      error: (err) => {

        this.eliminando = false;

        this.mostrarMensaje(
          err.error?.message || 'No se pudo eliminar el ingrediente.',
          'error'
        );

        this.cdr.detectChanges();
      }
    });
  }

  // Regresar al catálogo de recetas
  volverARecetas(): void {
    this.router.navigate(['/recetas']);
  }

  // Mostrar notificaciones
  mostrarMensaje(
    texto: string,
    tipo: 'success' | 'error'
  ): void {

    this.mensaje = texto;
    this.tipoMensaje = tipo;

    this.cdr.detectChanges();
  }

  // Cerrar notificación
  cerrarMensaje(): void {

    this.mensaje = '';
    this.cdr.detectChanges();
  }

}
