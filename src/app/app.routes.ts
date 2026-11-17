import { Routes } from '@angular/router';
import { Chatiacomponent } from './components/chatiacomponent/chatiacomponent';
import { Itemcomponent } from './components/itemcomponent/itemcomponent';
import { Recipecomponent } from './components/recipecomponent/recipecomponent';
import { Consumptioncomponent } from './components/consumptioncomponent/consumptioncomponent';
import { Familycomponent } from './components/familycomponent/familycomponent';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Finsertcomponent } from './components/familycomponent/finsertcomponent/finsertcomponent';
import { Flistcomponent } from './components/familycomponent/flistcomponent/flistcomponent';
import { Ingredientcomponent } from './components/ingredientcomponent/ingredientcomponent';
import { Iinsertcomponent } from './components/ingredientcomponent/iinsertcomponent/iinsertcomponent';
import { Ilistcomponent } from './components/ingredientcomponent/ilistcomponent/ilistcomponent';
import { Fupdatecomponent } from './components/familycomponent/fupdatecomponent/fupdatecomponent';
import { Itlistcomponent } from './components/itemcomponent/itlistcomponent/itlistcomponent';
import {Itinsertcomponent} from './components/itemcomponent/itinsertcomponent/itinsertcomponent';
import { Iupdatecomponent } from './components/ingredientcomponent/iupdatecomponent/iupdatecomponent';
import { Countrycomponent } from './components/countrycomponent/countrycomponent';
import { Coinsertcomponent } from './components/countrycomponent/coinsertcomponent/coinsertcomponent';
import { Colistcomponent } from './components/countrycomponent/colistcomponent/colistcomponent';
import { Coupdatecomponent } from './components/countrycomponent/coupdatecomponent/coupdatecomponent';
import { Itupdatecomponent } from './components/itemcomponent/itupdatecomponent/itupdatecomponent';
import { Cslistcomponent } from './components/consumptioncomponent/cslistcomponent/cslistcomponent';
import { Csinsertcomponent } from './components/consumptioncomponent/csinsertcomponent/csinsertcomponent';

export const routes: Routes = [
    {
        path:'',
        component: Homecomponent
    },
    {
        path: 'items',
        component: Itemcomponent,
        children:
        [
            {
                path: '',
                redirectTo: 'listar',
                pathMatch: 'full'
            },
            {
            path:'insertar',
            component:Itinsertcomponent
            },
            {
            path:'listar',
            component:Itlistcomponent
            },

            {
            path: 'editar/:id',
            component: Itupdatecomponent
            },



        ]
    },
    {
        path:'recetas',
        component: Recipecomponent
    },
    {
        path:'consumo',
        component: Consumptioncomponent,

        children:
        [
            {
                path: '',
                redirectTo: 'listar',
                pathMatch: 'full'
            },
            {
            path:'listar',
            component: Cslistcomponent
            },
            {
            path:'insertar',
            component: Csinsertcomponent
            },
        ]

    },
    {
        path:'familia',
        component:Familycomponent,
        children:
        [
            {
                path: '',
                redirectTo: 'listar',
                pathMatch: 'full'
            },
            {
            path:'insertar',
            component:Finsertcomponent
            },
            {
            path:'listar',
            component:Flistcomponent
            },
            {
            path:'actualizar/:id',
            component:Fupdatecomponent
            }
        ]
    },
    {
        path:'ingrediente',
        component:Ingredientcomponent,
        children:
        [
            {
                path: '',
                redirectTo: 'listar',
                pathMatch: 'full'
            },
            {
            path:'insertar',
            component:Iinsertcomponent
            },
            {
            path:'listar',
            component:Ilistcomponent
            },
            {
            path:'actualizar/:id',
            component:Iupdatecomponent
            }
        ]
    },
    {
        path:'pais',
        component:Countrycomponent,
        children:
        [
            {
                path: '',
                redirectTo: 'listar',
                pathMatch: 'full'
            },
            {
            path:'insertar',
            component:Coinsertcomponent
            },
            {
            path:'listar',
            component:Colistcomponent
            },
            {
            path:'actualizar/:id',
            component:Coupdatecomponent
            }
        ]
    },
    {
        path:'chatia',
        component:Chatiacomponent
    }

];
