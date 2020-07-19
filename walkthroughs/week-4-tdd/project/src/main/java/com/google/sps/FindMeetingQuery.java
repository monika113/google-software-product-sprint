// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.*;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    //throw new UnsupportedOperationException("TODO: Implement this method.");
    ArrayList<TimeRange> eventTimeRange = new ArrayList<TimeRange>();
    Iterator<Event> eventIterator = events.iterator();
    while(eventIterator.hasNext()){
        Event next = eventIterator.next();
        Set<String> intersect = new HashSet<String>();
        intersect.addAll(next.getAttendees());
        intersect.retainAll(request.getAttendees());
        if (!intersect.isEmpty()){
            eventTimeRange.add(next.getWhen());
        }
    }

    ArrayList<TimeRange> results = new ArrayList<TimeRange>();
    if (eventTimeRange.isEmpty()){
        if (request.getDuration() > TimeRange.WHOLE_DAY.duration()){
            return results;
        }
        results.add(TimeRange.WHOLE_DAY);
        return results;
    }

    Collections.sort(eventTimeRange, TimeRange.ORDER_BY_START);
    Iterator<TimeRange> timeRangeIterator = eventTimeRange.iterator();
    TimeRange next = timeRangeIterator.next();
    TimeRange cur = next;
    if (next.start() > TimeRange.START_OF_DAY){
        results.add(TimeRange.fromStartEnd(TimeRange.START_OF_DAY, next.start(), false));
    }
    while(timeRangeIterator.hasNext()){
        next = timeRangeIterator.next();
        if (cur.contains(next)){
            continue;
        }
        if (next.contains(cur)){
            cur = next;
            continue;
        }
        if (next.overlaps(cur)){
            cur = TimeRange.fromStartEnd(cur.start(), next.end(), false);
            continue;
        }
        TimeRange option = TimeRange.fromStartEnd(cur.end(), next.start(), false);
        if (option.duration() >= request.getDuration()){
            results.add(option);
        } 
        cur = next;
    }
    if (cur.end() < TimeRange.END_OF_DAY){
        results.add(TimeRange.fromStartEnd(cur.end(), TimeRange.END_OF_DAY, true));
    }
    return results;
  }
}
