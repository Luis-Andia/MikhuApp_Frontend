import { Routes, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Loginservice } from './services/loginservice';

// Guards
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

// Autenticación
import { Logincomponent } from './components/logincomponent/logincomponent';
import { Registrocomponent } from './components/registrocomponent/registrocomponent';

// Dashboard
import { Dashboardcomponent } from './components/dashboardcomponent/dashboardcomponent';

// Chat IA
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
import { Finsertcomponent } from './components/familycomponent/finsertcomponent/finsertcomponent';
import { Flistcomponent } from './components/familycomponent/flistcomponent/flistcomponent';
import { Fupdatecomponent } from './components/familycomponent/fupdatecomponent/fupdatecomponent';

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
import { Landingcomponent } from './components/landingcomponent/landingcomponent';
import { Csupdatecomponent } from './components/consumptioncomponent/csupdatecomponent/csupdatecomponent';
import { Fintegrantecomponent } from './components/familycomponent/fintegrantecomponent/fintegrantecomponent';
import { Profilecomponent } from './components/profilecomponent/profilecomponent';
export const routes: Routes = [
  // Inicio
  { path: '', component: Landingcomponent },

  // Login público
  {
    path: 'login',
    component: Logincomponent,
  },

  // Registro público
  {
    path: 'registro',
    component: Registrocomponent,
  },

  // Dashboard
  {
    path: 'dashboard',
    component: Dashboardcomponent,
    canActivate: [authGuard],
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
      {
        path: 'ingredientes/:idRecipe',
        component: Recipeingredientcomponent,
      },
    ],
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

      {
        path: 'integrantes/:id',
        component: Fintegrantecomponent,
      },
    ],
  },

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

  // Usuarios: acceso administrativo
  {
    path: 'usuarios',
    component: Usercomponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] },
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full',
      },
      {
        path: 'listar',
        component: Ulistcomponent,
      },
    ],
  },

  // Roles: acceso administrativo
  {
    path: 'roles',
    component: Rolcomponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] },
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full',
      },
      {
        path: 'registrar',
        component: Rinsertcomponent,
      },
      {
        path: 'listar',
        component: Rolelistcomponent,
      },
      {
        path: 'editar/:id',
        component: Rupdatecomponent,
      },
    ],
  },

  // Asistente IA
  {
    path: 'chatia',
    component: Chatiacomponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN', 'MODERATOR', 'MEMBER', 'GUEST'] },
  },

  // Perfil de usuario
  {
    path: 'perfil',
    component: Profilecomponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN', 'MODERATOR', 'MEMBER', 'GUEST'] },
  },

  // Ruta no encontrada
  {
    path: '**',
    redirectTo: 'login',
  },
];
