import { ChangeDetectorRef, Component } from '@angular/core';
import { Loginservice } from '../../services/loginservice';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-logincomponent',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.css'
})
export class Logincomponent {

  formulario: any;
  mensajeError = '';
  mensajeInfo = '';
  hide = true;
  submitting = false;

  constructor(
    private readonly auth: Loginservice,
    private readonly cdr: ChangeDetectorRef,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly route:ActivatedRoute
  ) {
    this.formulario = this.fb.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  clickEvent(event: MouseEvent): void {
    event.stopPropagation();
    this.hide = !this.hide;
  }

  iniciarSesion(): void {
    this.mensajeError = '';

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.mensajeError = 'Ingresa tu usuario y contraseña';
      return;
    }
    
    this.submitting = true;

    this.auth.login(this.formulario.getRawValue()).subscribe({
      next: () => {
        this.submitting = false;

        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        const destination =
          returnUrl?.startsWith('/') && !returnUrl.startsWith('//') && returnUrl !== '/'
            ? returnUrl
            : '/dashboard';

        void this.router.navigateByUrl(destination);
      },
      error: () => {
        this.submitting = false;
        this.mensajeError = 'No se pudo iniciar sesión. Verifica tus credenciales e inténtalo nuevamente.';
      },
    });
  }
}