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

package com.khartec.waltz.common;

import org.junit.Test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class StringUtilities_isEmpty {

    @Test
    public void trueIfOnlyWhitespace() {
        assertTrue(StringUtilities.isEmpty("   \t"));
    }

    @Test
    public void trueIfEmptyString() {
        assertTrue(StringUtilities.isEmpty(""));
    }

    @Test
    public void trueIfNull() {
        assertTrue(StringUtilities.isEmpty((String) null));
    }

    @Test
    public void falseIfNotEmpty() {
        assertFalse(StringUtilities.isEmpty("  hello  "));
    }
}
