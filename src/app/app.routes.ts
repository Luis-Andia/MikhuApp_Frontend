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
            path:'insertar',
            component:Itinsertcomponent
            },
            {
            path:'listar',
            component:Itlistcomponent
            },
        ]
    },
    {
        path:'recetas',
        component: Recipecomponent
    },
    {
        path:'consumo',
        component: Consumptioncomponent
    },
    {
        path:'familia',
        component:Familycomponent,
        children:
        [
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
        path:'chatia',
        component:Chatiacomponent
    }

];
