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

package com.khartec.waltz.jobs;

import com.khartec.waltz.data.measurable.MeasurableIdSelectorFactory;
import com.khartec.waltz.model.EntityKind;
import com.khartec.waltz.model.EntityReference;
import com.khartec.waltz.model.HierarchyQueryScope;
import com.khartec.waltz.model.IdSelectionOptions;
import com.khartec.waltz.model.measurable.Measurable;
import com.khartec.waltz.service.DIConfiguration;
import com.khartec.waltz.service.measurable.MeasurableService;
import org.jooq.Record1;
import org.jooq.Select;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.List;

import static com.khartec.waltz.model.EntityReference.mkRef;
import static com.khartec.waltz.model.IdSelectionOptions.mkOpts;


public class MeasurableHarness {

    public static void main(String[] args) {

        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(DIConfiguration.class);

        MeasurableIdSelectorFactory factory = ctx.getBean(MeasurableIdSelectorFactory.class);
        MeasurableService measurableService = ctx.getBean(MeasurableService.class);

        EntityReference ref = mkRef(
                EntityKind.APP_GROUP,
                3);

        IdSelectionOptions options = mkOpts(
                ref,
                HierarchyQueryScope.EXACT);

        Select<Record1<Long>> selector = factory.apply(options);

        System.out.println("--selector");
        System.out.println(selector);
        System.out.println("---");

        List<Measurable> measurables = measurableService.findByMeasurableIdSelector(options);
        measurables.forEach(System.out::println);


    }

}
