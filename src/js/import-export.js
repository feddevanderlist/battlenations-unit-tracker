function exportData() {
    const data = {
        tracking: getStoredTrackingData(),
        filters: getCurrentFilters()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `unitTracking_${new Date().toISOString().replace(/[:T]/g, '-').split('.')[0]}.json`;
    a.click();
}

function importData(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (!imported.tracking) throw new Error("Missing 'tracking'");
            localStorage.setItem('unitTracking', JSON.stringify(imported.tracking));
            if (imported.filters) setFilters(imported.filters);
            drawTable();
        } catch (e) {
            alert('Invalid file format.');
        }
    };
    reader.readAsText(file);
}