import { Routes } from '@angular/router';

import { Chatiacomponent } from './components/chatiacomponent/chatiacomponent';

// Inventario
import { Itemcomponent } from './components/itemcomponent/itemcomponent';
import { Itinsertcomponent } from './components/itemcomponent/itinsertcomponent/itinsertcomponent';
import { Itlistcomponent } from './components/itemcomponent/itlistcomponent/itlistcomponent';
import { Itupdatecomponent } from './components/itemcomponent/itupdatecomponent/itupdatecomponent';

// Recetas
import { Recipecomponent } from './components/recipecomponent/recipecomponent';
import { Rlistcomponent as Recipecatalogocomponent } from './components/recipecomponent/rlistcomponent/rlistcomponent';
import { Reinsertcomponent } from './components/recipecomponent/reinsertcomponent/reinsertcomponent';
import { Relistcomponent } from './components/recipecomponent/relistcomponent/relistcomponent';
import { Reupdatecomponent } from './components/recipecomponent/reupdatecomponent/reupdatecomponent';
import { Recipeingredientcomponent } from './components/recipecomponent/recipeingredientcomponent/recipeingredientcomponent';

// Consumos
import { Consumptioncomponent } from './components/consumptioncomponent/consumptioncomponent';
import { Cslistcomponent } from './components/consumptioncomponent/cslistcomponent/cslistcomponent';
import { Csinsertcomponent } from './components/consumptioncomponent/csinsertcomponent/csinsertcomponent';

// Familia
import { Familycomponent } from './components/familycomponent/familycomponent';
import { Dashboardcomponent } from './components/dashboardcomponent/dashboardcomponent';

// Familia
import { Finsertcomponent } from './components/familycomponent/finsertcomponent/finsertcomponent';
import { Flistcomponent } from './components/familycomponent/flistcomponent/flistcomponent';
import { Fupdatecomponent } from './components/familycomponent/fupdatecomponent/fupdatecomponent';

// Ingredientes
// Ingredientes
import { Ingredientcomponent } from './components/ingredientcomponent/ingredientcomponent';
import { Iinsertcomponent } from './components/ingredientcomponent/iinsertcomponent/iinsertcomponent';
import { Ilistcomponent } from './components/ingredientcomponent/ilistcomponent/ilistcomponent';
import { Iupdatecomponent } from './components/ingredientcomponent/iupdatecomponent/iupdatecomponent';

// Inventario
import { Itlistcomponent } from './components/itemcomponent/itlistcomponent/itlistcomponent';
import { Itinsertcomponent } from './components/itemcomponent/itinsertcomponent/itinsertcomponent';
import { Itupdatecomponent } from './components/itemcomponent/itupdatecomponent/itupdatecomponent';

// Países
import { Countrycomponent } from './components/countrycomponent/countrycomponent';
import { Coinsertcomponent } from './components/countrycomponent/coinsertcomponent/coinsertcomponent';
import { Colistcomponent } from './components/countrycomponent/colistcomponent/colistcomponent';
import { Coupdatecomponent } from './components/countrycomponent/coupdatecomponent/coupdatecomponent';
import { Homecomponent } from './components/homecomponent/homecomponent';

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

  // Login
  {
    path: 'login',
    component: Logincomponent
  },

  // Registro
  {
    path: 'registro',
    component: Registrocomponent
  },

  // Dashboard principal
  {
    path: 'dashboard',
    component: Dashboardcomponent
  },

  // Página inicial: redirige al login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
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
        pathMatch: 'full',
      },
      {
        path: 'insertar',
        component: Itinsertcomponent,
      },
      {
        path: 'listar',
        component: Itlistcomponent,
      },
      {
        path: 'editar/:id',
        component: Itupdatecomponent,
      },
    ],
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
        component: Recipecatalogocomponent,
      },
      {
        path: 'insertar',
        component: Reinsertcomponent,
      },
      {
        path: 'listar',
        component: Relistcomponent,
      },
      {
        path: 'actualizar/:id',
        component: Reupdatecomponent,
      },
    ],
  },

  // Consumo
  {
    path: 'consumo',
    component: Consumptioncomponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN', 'MODERATOR', 'MEMBER', 'GUEST'] },
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full',
      },
      {
        path: 'listar',
        component: Cslistcomponent,
      },
      {
        path: 'insertar',
        component: Csinsertcomponent,
      },
      {
        path: 'editar/:id',
        component: Csupdatecomponent,
      },
    ],
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
        pathMatch: 'full',
      },
      {
        path: 'insertar',
        component: Finsertcomponent,
      },
      {
        path: 'listar',
        component: Flistcomponent,
      },
      {
        path: 'actualizar/:id',
        component: Fupdatecomponent,
      },
    ],
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
        pathMatch: 'full',
      },
      {
        path: 'insertar',
        component: Iinsertcomponent,
      },
      {
        path: 'listar',
        component: Ilistcomponent,
      },
      {
        path: 'actualizar/:id',
        component: Iupdatecomponent,
      },
    ],
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
        pathMatch: 'full',
      },
      {
        path: 'insertar',
        component: Coinsertcomponent,
      },
      {
        path: 'listar',
        component: Colistcomponent,
      },
      {
        path: 'actualizar/:id',
        component: Coupdatecomponent,
      },
    ],
  },

  // Roles
  {
    path: 'roles',
    component: Rlistcomponent,
  },
  {
    path: 'roles/registrar',
    component: Rinsertcomponent,
  },
  {
    path: 'roles/editar/:id',
    component: Rupdatecomponent,
  },

  // Asistente IA

  // Asistente IA
  {
    path: 'chatia',
    component: Chatiacomponent
  },

  // Cualquier ruta desconocida vuelve al login
  {
    path: '**',
    redirectTo: 'login'
  }
];
