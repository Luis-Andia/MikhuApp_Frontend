import { Routes } from '@angular/router';
import { Chatiacomponent } from './components/chatiacomponent/chatiacomponent';
import { Itemcomponent } from './components/itemcomponent/itemcomponent';
import { Recipecomponent } from './components/recipecomponent/recipecomponent';
import { Consumptioncomponent } from './components/consumptioncomponent/consumptioncomponent';
import { Familycomponent } from './components/familycomponent/familycomponent';
import { Homecomponent } from './components/homecomponent/homecomponent';

export const routes: Routes = [
    {
        path:'',
        component: Homecomponent
    },
    {
        path: 'inventario',
        component: Itemcomponent,
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
        component:Familycomponent
    }

];
