function drawViz(data) {

    var oldDiv = document.getElementsByTagName("div")[0]
    if (oldDiv) oldDiv.remove()

    var dates = [],
        dimensions = []

    data.tables.DEFAULT.map(dataPoint => {
        if (dates.indexOf(dataPoint.date[0]) === -1) { dates.push(dataPoint.date[0]) }
        if (dimensions.indexOf(dataPoint.dimension[0]) === -1) { dimensions.push(dataPoint.dimension[0]) }
    })

    dates.sort()
    dates.reverse()
    dimensions.unshift("")

    var columns = dimensions.length,
        rows = dates.length

    var container = document.createElement("div")
    container.classList.add("container")
    document.body.appendChild(container);

    var table = document.createElement("div")
    table.classList.add("table")
    container.appendChild(table);

    dimensions.map(dimension => {
        var column = document.createElement("div")
        column.classList.add("column")
        if (dimension === "") {
            var cell = document.createElement("div")
            cell.classList.add("firstColumn", "firstRow", "firstCell", "cell")
            cell.innerHTML = "<span>date /<br>dimension</span>"
            column.appendChild(cell)
            dates.map(date => {
                var cell = document.createElement("div")
                cell.classList.add("firstColumn", "cell")
                var year = date.substring(0, 4);
                var month = date.substring(4, 6);
                var day = date.substring(6, 8);
                dateDate = new Date(year, month - 1, day);
                cell.innerHTML = "<span>" + dateDate.toLocaleDateString("fr-FR", { day: 'numeric' }) + " " + dateDate.toLocaleDateString("fr-FR", { month: 'short' }) + "</span>"
                column.appendChild(cell)
            })
        } else {
            var cell = document.createElement("div")
            cell.classList.add("firstRow", "cell")
            cell.innerHTML = "<span>" + dimension + "</span>"
            column.appendChild(cell)
        }

        dates.map(date => {
            if (dimension !== "") {
                var cell = document.createElement("div")
                cell.classList.add("cell", "dataCell")
                cell.innerHTML = "<span>" + data.style.textForMissingData.value + "</span>"
                column.appendChild(cell)
                data.tables.DEFAULT.map(dataPoint => {
                    if (dataPoint.dimension[0] === dimension && dataPoint.date[0] === date) {
                        dataPoint.metric[0] === 0 ? cell.innerHTML = "<span>" + data.style.textForZeroData.value + "</span>" : cell.innerHTML = "<span>" + data.style.textForAvailableData.value + "</span>"
                        dataPoint.metric[0] === 0 ? cell.classList.add("cell", "zeroData") : cell.classList.add("cell", "availableData")
                    }
                })
            }
        })
        table.appendChild(column);
    })

    //var dataText = document.createElement("div")
    //dataText.innerText = JSON.stringify(data)
    //container.appendChild(dataText);

    var style = document.createElement("style")
    style.innerText = "" +
        ".dataCell{" +
        "background-color: " + data.style.bgColorForMissingData.value.color + ";" +
        "color: " + data.style.textColorForMissingData.value.color + ";" +
        "}" +
        ".zeroData{" +
        "background-color: " + data.style.bgColorForZeroData.value.color + ";" +
        "color: " + data.style.textColorForZeroData.value.color + ";" +
        "}" +
        ".availableData{" +
        "background-color: " + data.style.bgColorForAvailableData.value.color + ";" +
        "color: " + data.style.textColorForAvailableData.value.color + ";" +
        "}" +
        ".firstRow, .firstColumn{" +
        "background-color: " + data.style.bgColorForFirsts.value.color + ";" +
        "color: " + data.style.textColorForFirsts.value.color + ";" +
        "}" +
        ".cell{" +
        "padding: " + data.style.cellPadding.value + ";" +
        "height: " + data.style.cellHeight.value + ";" +
        "}" +
        ".firstRow{" +
        "height: " + data.style.firstRowHeight.value + ";" +
        "}" +
        ".container{" +
        "font-family: " + data.style.fontFamily.value + ";" +
        "font-size: " + data.style.fontSize.value + "px;" +
        "}"

    container.appendChild(style)

}

// subscribe to data and style changes
dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });