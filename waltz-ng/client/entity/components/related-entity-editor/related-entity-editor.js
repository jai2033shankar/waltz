/*
 * Waltz - Enterprise Architecture
 * Copyright (C) 2016  Khartec Ltd.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import _ from "lodash";
import {initialiseData, invokeFunction} from "../../../common";
import {entityNames} from "../../../common/services/display-names";


const bindings = {
    allowedRelationships: '<',
    currentRelationships: '<',
    parentEntityRef: '<',
    targetEntityKind: '<',

    onAdd: '<',
    onRemove: '<'
};


const template = require('./related-entity-editor.html');


const initialState = {
    allowedRelationships: [],
    currentRelationship: {},
    currentRelationships: [],
    parentEntityRef: null,
    targetEntityKind: null,
    targetEntityDisplayName: null,

    onAdd: () => console.log("default onAdd handler for related-entity-editor"),
    onRemove: () => console.log("default onAdd handler for related-entity-editor")
};


function controller() {
    const vm = initialiseData(this, initialState);

    vm.$onChanges = (changes) => {
        if(changes.targetEntityKind) {
            vm.targetEntityDisplayName = _.toLower(entityNames[vm.targetEntityKind]) + "s";
        }
    };

    vm.onEntitySelect = (id, entity) => {
        vm.currentRelationship.entity = entity;
    };

    vm.isCurrentRelationshipValid = () => {
        return vm.currentRelationship
            && vm.currentRelationship.entity
            && vm.currentRelationship.relationship;
    };

    vm.onRelationshipAdd = () => {
        const currentRelationship = vm.currentRelationship;
        invokeFunction(vm.onAdd, currentRelationship);
        vm.currentRelationship = {};
    };

}


controller.$inject = [
];


const component = {
    bindings,
    template,
    controller
};


export default component;
