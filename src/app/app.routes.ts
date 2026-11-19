
import { Routes, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Loginservice } from './services/loginservice';

// Autenticación
import { Logincomponent } from './components/logincomponent/logincomponent';
import { Registrocomponent } from './components/registrocomponent/registrocomponent';

// Dashboard
import { Dashboardcomponent } from './components/dashboardcomponent/dashboardcomponent';

// Chat IA
import { Chatiacomponent } from './components/chatiacomponent/chatiacomponent';

// Inventario

// Inventario
import { Itemcomponent } from './components/itemcomponent/itemcomponent';
import { Itinsertcomponent } from './components/itemcomponent/itinsertcomponent/itinsertcomponent';
import { Itlistcomponent } from './components/itemcomponent/itlistcomponent/itlistcomponent';
import { Itupdatecomponent } from './components/itemcomponent/itupdatecomponent/itupdatecomponent';

// Recetas
import { Itinsertcomponent } from './components/itemcomponent/itinsertcomponent/itinsertcomponent';
import { Itlistcomponent } from './components/itemcomponent/itlistcomponent/itlistcomponent';
import { Itupdatecomponent } from './components/itemcomponent/itupdatecomponent/itupdatecomponent';

// Recetas
import { Recipecomponent } from './components/recipecomponent/recipecomponent';
import { Rlistcomponent as Recipecatalogocomponent, Rlistcomponent } from './components/recipecomponent/rlistcomponent/rlistcomponent';
import { Reinsertcomponent } from './components/recipecomponent/reinsertcomponent/reinsertcomponent';
import { Relistcomponent } from './components/recipecomponent/relistcomponent/relistcomponent';
import { Reupdatecomponent } from './components/recipecomponent/reupdatecomponent/reupdatecomponent';
import { Recipeingredientcomponent } from './components/recipecomponent/recipeingredientcomponent/recipeingredientcomponent';

// Consumos
import { Recipeingredientcomponent } from './components/recipecomponent/recipeingredientcomponent/recipeingredientcomponent';

// Consumos
import { Consumptioncomponent } from './components/consumptioncomponent/consumptioncomponent';
import { Cslistcomponent } from './components/consumptioncomponent/cslistcomponent/cslistcomponent';
import { Csinsertcomponent } from './components/consumptioncomponent/csinsertcomponent/csinsertcomponent';

// Familia
import { Cslistcomponent } from './components/consumptioncomponent/cslistcomponent/cslistcomponent';
import { Csinsertcomponent } from './components/consumptioncomponent/csinsertcomponent/csinsertcomponent';

// Familia
import { Familycomponent } from './components/familycomponent/familycomponent';
import { Finsertcomponent } from './components/familycomponent/finsertcomponent/finsertcomponent';
import { Flistcomponent } from './components/familycomponent/flistcomponent/flistcomponent';
import { Fupdatecomponent } from './components/familycomponent/fupdatecomponent/fupdatecomponent';

// Ingredientes
// Ingredientes
import { Ingredientcomponent } from './components/ingredientcomponent/ingredientcomponent';
import { Iinsertcomponent } from './components/ingredientcomponent/iinsertcomponent/iinsertcomponent';
import { Ilistcomponent } from './components/ingredientcomponent/ilistcomponent/ilistcomponent';
import { Iupdatecomponent } from './components/ingredientcomponent/iupdatecomponent/iupdatecomponent';

// Países
import { Countrycomponent } from './components/countrycomponent/countrycomponent';
import { Coinsertcomponent } from './components/countrycomponent/coinsertcomponent/coinsertcomponent';
import { Colistcomponent } from './components/countrycomponent/colistcomponent/colistcomponent';
import { Coupdatecomponent } from './components/countrycomponent/coupdatecomponent/coupdatecomponent';

// Usuarios
import { Usercomponent } from './components/usercomponent/usercomponent';
import { Ulistcomponent } from './components/usercomponent/ulistcomponent/ulistcomponent';

// Roles
import { Rlistcomponent as Rolelistcomponent } from './components/rolcomponent/rlistcomponent/rlistcomponent';
import { Rinsertcomponent } from './components/rolcomponent/rinsertcomponent/rinsertcomponent';
import { Rupdatecomponent } from './components/rolcomponent/rupdatecomponent/rupdatecomponent';
import { Rolcomponent } from './components/rolcomponent/rolcomponent';


// Consumos
import { Cslistcomponent } from './components/consumptioncomponent/cslistcomponent/cslistcomponent';
import { Csinsertcomponent } from './components/consumptioncomponent/csinsertcomponent/csinsertcomponent';

// Roles
import { Rlistcomponent } from './components/rolecomponent/rlistcomponent/rlistcomponent';
import { Rinsertcomponent } from './components/rolecomponent/rinsertcomponent/rinsertcomponent';
import { Rupdatecomponent } from './components/rolecomponent/rupdatecomponent/rupdatecomponent';

// Autenticación
import { Logincomponent } from './components/logincomponent/logincomponent';
import { Registrocomponent } from './components/registrocomponent/registrocomponent';

export const routes: Routes = [

  // Pantalla principal: verificar sesión
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => {
      const loginService = inject(Loginservice);

      const token = loginService.obtenerToken();

      if (token && !loginService.tokenExpirado()) {
        return '/dashboard';
      }

      if (token) {
        loginService.cerrarSesion();
      }

      return '/login';
    }
  },

  // Login: si existe una sesión vigente, ir al dashboard
  {
    path: 'login',
    component: Logincomponent,
    canActivate: [
      () => {
        const loginService = inject(Loginservice);
        const router = inject(Router);

        const token = loginService.obtenerToken();

        if (token && !loginService.tokenExpirado()) {
          return router.createUrlTree(['/dashboard']);
        }

        if (token) {
          loginService.cerrarSesion();
        }

        return true;
      }
    ]
  },

  {
    path: 'registro',
    component: Registrocomponent
  },

  // Dashboard
  {
    path: 'dashboard',
    component: Dashboardcomponent
  },

  // Inventario
  {
    path: 'items',
    component: Itemcomponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN', 'MODERATOR', 'MEMBER'] },
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
      },
      {
        path: 'insertar',
        component: Itinsertcomponent
      },
      {
        path: 'listar',
        component: Itlistcomponent
      },
      {
        path: 'editar/:id',
        component: Itupdatecomponent
      }
    ]
  },

  // Recetas
  {
    path: 'recetas',
    component: Recipecomponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN', 'MODERATOR', 'MEMBER', 'GUEST'] },
    children: [
      {
        path: '',
        component: Recipecatalogocomponent
      },
      {
        path: 'insertar',
        component: Reinsertcomponent
      },
      {
        path: 'listar',
        component: Relistcomponent
      },
      {
        path: 'actualizar/:id',
        component: Reupdatecomponent
      },
      {
        path: 'ingredientes/:idRecipe',
        component: Recipeingredientcomponent
      }
    ]
  },

  // Consumos
  {
    path: 'consumo',
    component: Consumptioncomponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN', 'MODERATOR', 'MEMBER', 'GUEST'] },
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
      },
      {
        path: 'listar',
        component: Cslistcomponent
      },
      {
        path: 'insertar',
        component: Csinsertcomponent
      }
    ]
  },

  // Familia

  // Familia
  {
    path: 'familia',
    component: Familycomponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN', 'MODERATOR', 'MEMBER', 'GUEST'] },
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
      },
      {
        path: 'insertar',
        component: Finsertcomponent
      },
      {
        path: 'listar',
        component: Flistcomponent
      },
      {
        path: 'actualizar/:id',
        component: Fupdatecomponent
      }
    ]
  },

  // Ingredientes

  // Ingredientes
  {
    path: 'ingrediente',
    component: Ingredientcomponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN', 'MODERATOR', 'MEMBER', 'GUEST'] },
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
      },
      {
        path: 'insertar',
        component: Iinsertcomponent
      },
      {
        path: 'listar',
        component: Ilistcomponent
      },
      {
        path: 'actualizar/:id',
        component: Iupdatecomponent
      }
    ]
  },

  // Países

  // Países
  {
    path: 'pais',
    component: Countrycomponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] },
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
      },
      {
        path: 'insertar',
        component: Coinsertcomponent
      },
      {
        path: 'listar',
        component: Colistcomponent
      },
      {
        path: 'actualizar/:id',
        component: Coupdatecomponent
      }
    ]
  },

  // Usuarios
  {
    path: 'usuarios',
    component: Usercomponent,
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
      },
      {
        path: 'listar',
        component: Ulistcomponent
      }
    ]
  },

  // Roles
  {
    path: 'roles',
    component: Rolcomponent,
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
      },
      {
        path: 'registrar',
        component: Rinsertcomponent
      },
      {
        path:'listar',
        component:Rolelistcomponent
      },
      {
        path: 'editar/:id',
        component: Rupdatecomponent
      },
    ]
  },
  // Asistente IA

  // Asistente IA
  {
    path: 'chatia',
    component: Chatiacomponent
  },

  // Si la ruta no existe, regresar al Login
  {
    path: '**',
    redirectTo: 'login'
  }

];
