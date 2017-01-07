/*
 * Waltz - Enterprise Architecture
 * Copyright (C) 2016  Khartec Ltd.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import _ from 'lodash';
import {initialiseData, buildHierarchies, switchToParentIds} from '../../../common';
import {measurableKindNames} from '../../../common/services/display-names';

/**
 * @name waltz-measurable-ratings-browser
 *
 * @description
 * This component ...
 */


const bindings = {
    measurables: '<',
    ratings: '<',
    onSelect: '<',
    scrollHeight: '<'
};


const initialState = {
    containerClass: [],
    measurables: [],
    ratings: [],
    treeOptions: {
        nodeChildren: "children",
        dirSelectable: true,
        equality: function(node1, node2) {
            if (node1 && node2) {
                return node1.id === node2.id;
            } else {
                return false;
            }
        }
    },
    onSelect: (d) => console.log('wmrb: default on-select', d),
    visibility: {
        tab: null
    }
};


const template = require('./measurable-ratings-browser.html');


function mkEmptyRating() {
    return { R: 0, A: 0, G: 0, Z: 0, total: 0};
}


function addRatings(
    r1 = mkEmptyRating(),
    r2 = mkEmptyRating()) {

    return {
        R: (r1.R || 0) + (r2.R || 0),
        A: (r1.A || 0) + (r2.A || 0),
        G: (r1.G || 0) + (r2.G || 0),
        Z: (r1.Z || 0) + (r2.Z || 0),
        total: (r1.total || 0) + (r2.total || 0)
    };
}


function toRatingsObj(ratings = []) {
    const byRating = _.keyBy(ratings, 'rating');
    const r = _.get(byRating, 'R.count', 0);
    const a = _.get(byRating, 'A.count', 0);
    const g = _.get(byRating, 'G.count', 0);
    const z = _.get(byRating, 'Z.count', 0);
    const total = r + a + g + z;

    return {
        R: r,
        A: a,
        G: g,
        Z: z,
        total
    };
}


function prepareTreeData(data = []) {
    return switchToParentIds(buildHierarchies(data));
}


function prepareTabs(measurables = []) {
    const byKind = _.groupBy(measurables, 'kind');

    const tabs = _.map(measurableKindNames, (n,k) => {
        const treeData = prepareTreeData(byKind[k]);
        const maxSize = _.chain(treeData)
            .map('totalRatings.total')
            .max()
            .value();

        return {
            kind: k,
            name: n,
            treeData,
            maxSize,
            expandedNodes: _.clone(byKind[k] || [])
        };
    });

    return _.sortBy(tabs, 'name');
}


function findFirstNonEmptyTabKind(tabs = []) {
    const firstNonEmptyTab = _.find(tabs, t => t.treeData.length > 0);
    return _.get(firstNonEmptyTab || tabs[0], 'kind');
}


function initialiseRatingsMap(ratings, measurables) {
    const ratingsById = _.groupBy(ratings, 'id');

    const reducer = (acc, m) => {
        const ratingsObj = ratingsById[m.id]
            ? toRatingsObj(ratingsById[m.id])
            : mkEmptyRating();

        acc[m.id] = {
            direct: _.clone(ratingsObj),
            total: _.clone(ratingsObj),
        };
        return acc;
    };
    const ratingsMap = _.reduce(measurables, reducer, {});
    return ratingsMap;
}


function mkRatingsMap(ratings = [], measurables = []) {
    const measurablesById = _.keyBy(measurables, 'id');
    const ratingsMap = initialiseRatingsMap(ratings, measurables);

    _.each(measurables, m => {
        const rs = ratingsMap[m.id];
        while (m.parentId) {
            const parent = measurablesById[m.parentId];
            const parentRating = ratingsMap[m.parentId];
            parentRating.total = addRatings(parentRating.total, rs.direct);
            m = parent;
        }
    });

    return ratingsMap;
}


function controller() {
    const vm = initialiseData(this, initialState);

    vm.$onChanges = (c) => {
        if (c.measurables || c.ratings) {
            vm.tabs = prepareTabs(vm.measurables);
            vm.ratingsMap = mkRatingsMap(vm.ratings, vm.measurables);
            vm.visibility.tab = findFirstNonEmptyTabKind(vm.tabs);
            vm.maxTotal = _.max(
                _.map(
                    _.values(vm.ratingsMap),
                    r => _.get(r, 'total.total'), 0));
        }

        if (c.scrollHeight) {
            vm.containerClass = [
                `waltz-scroll-region-${vm.scrollHeight}`
            ];
        }
    };
}


controller.$inject = [];


const component = {
    template,
    bindings,
    controller
};


export default component;