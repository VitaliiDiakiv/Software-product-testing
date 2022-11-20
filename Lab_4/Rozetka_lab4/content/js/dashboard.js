/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9556389530408006, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.8294605809128631, 500, 1500, ""], "isController": true}, {"data": [0.9916666666666667, 500, 1500, "-60"], "isController": false}, {"data": [1.0, 500, 1500, "-50"], "isController": false}, {"data": [0.990228013029316, 500, 1500, "-61"], "isController": false}, {"data": [0.9905660377358491, 500, 1500, "-51"], "isController": false}, {"data": [1.0, 500, 1500, "-62"], "isController": false}, {"data": [1.0, 500, 1500, "-52"], "isController": false}, {"data": [0.9904153354632588, 500, 1500, "-53"], "isController": false}, {"data": [1.0, 500, 1500, "-54"], "isController": false}, {"data": [1.0, 500, 1500, "-55"], "isController": false}, {"data": [0.9886363636363636, 500, 1500, "-56"], "isController": false}, {"data": [0.9852459016393442, 500, 1500, "-57"], "isController": false}, {"data": [0.9880952380952381, 500, 1500, "-58"], "isController": false}, {"data": [0.9932432432432432, 500, 1500, "-59"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 3991, 0, 0.0, 151.20270608869947, 24, 12396, 65.0, 214.0, 234.0, 491.0799999999999, 147.68354055654234, 38.23836277475577, 68.4139055214809], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["", 1205, 0, 0.0, 434.6033195020747, 63, 13283, 254.0, 926.0, 1079.1000000000001, 1372.8200000000002, 48.101872180751265, 40.576247891800726, 72.62590565246897], "isController": true}, {"data": ["-60", 300, 0, 0.0, 216.39333333333337, 47, 12396, 95.5, 219.0, 234.0, 549.1600000000008, 12.15854745886358, 3.3246028207830105, 5.556836143308746], "isController": false}, {"data": ["-50", 320, 0, 0.0, 70.40937500000001, 63, 155, 65.0, 100.0, 103.0, 143.0, 18.93267068985919, 4.270944266950656, 8.967134066974323], "isController": false}, {"data": ["-61", 307, 0, 0.0, 220.2833876221498, 46, 12200, 198.0, 220.39999999999998, 266.0, 631.5600000000015, 13.04163126593033, 3.566071049277825, 5.960433039507222], "isController": false}, {"data": ["-51", 318, 0, 0.0, 191.20440251572322, 46, 12213, 199.5, 238.10000000000002, 265.60000000000014, 583.7000000000002, 11.860361032373564, 3.243067469789646, 5.42055562807698], "isController": false}, {"data": ["-62", 290, 0, 0.0, 65.53793103448278, 63, 76, 65.0, 67.0, 69.0, 72.0, 18.56356420432723, 4.1876790343746, 8.792313124119831], "isController": false}, {"data": ["-52", 319, 0, 0.0, 65.435736677116, 64, 75, 65.0, 67.0, 68.0, 71.80000000000001, 19.009594183898457, 4.288297125469281, 9.00356755780347], "isController": false}, {"data": ["-53", 313, 0, 0.0, 186.98722044728427, 46, 12057, 197.0, 233.60000000000002, 372.0000000000002, 529.5000000000003, 12.73444810610684, 3.4820756540135887, 5.820040735994141], "isController": false}, {"data": ["-54", 313, 0, 0.0, 29.99361022364219, 24, 62, 27.0, 51.60000000000002, 55.0, 61.0, 18.8667872212176, 5.234645776823387, 8.84380650994575], "isController": false}, {"data": ["-55", 308, 0, 0.0, 65.73051948051956, 63, 84, 65.0, 67.0, 70.0, 77.91000000000003, 18.96551724137931, 4.278353987068966, 9.019733297413794], "isController": false}, {"data": ["-56", 308, 0, 0.0, 159.14935064935074, 46, 681, 199.0, 259.8000000000002, 443.6500000000005, 568.670000000001, 18.806863283873728, 5.142501679184222, 8.595324235207913], "isController": false}, {"data": ["-57", 305, 0, 0.0, 301.27540983606565, 46, 12379, 198.0, 221.0, 305.4, 12111.46, 11.985695759814517, 3.277338684324282, 5.477837515227728], "isController": false}, {"data": ["-58", 294, 0, 0.0, 221.1088435374149, 46, 12206, 72.5, 221.5, 265.25, 1197.5500000001302, 14.142774677698672, 3.8671649509332306, 6.463689989416971], "isController": false}, {"data": ["-59", 296, 0, 0.0, 181.1418918918918, 47, 12049, 198.0, 217.3, 232.14999999999998, 517.8799999999947, 18.70576339737108, 5.114857178968656, 8.549118427704752], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 3991, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
