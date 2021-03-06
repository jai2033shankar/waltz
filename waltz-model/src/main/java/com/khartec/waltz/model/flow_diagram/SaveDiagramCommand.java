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

package com.khartec.waltz.model.flow_diagram;

/**
 * Created by dwatkins on 06/04/2017.
 */

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.khartec.waltz.model.DescriptionProvider;
import com.khartec.waltz.model.NameProvider;
import com.khartec.waltz.model.command.Command;
import org.immutables.value.Value;

import java.util.List;
import java.util.Optional;

@Value.Immutable
@JsonSerialize(as = ImmutableSaveDiagramCommand.class)
@JsonDeserialize(as = ImmutableSaveDiagramCommand.class)
public abstract class SaveDiagramCommand implements Command, NameProvider, DescriptionProvider {

    public abstract Optional<Long> diagramId();

    public abstract String layoutData();

    public abstract List<FlowDiagramEntity> entities();

    public abstract List<FlowDiagramAnnotation> annotations();
}
