import React from 'react';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const exportFile = ({ data, filename }) => {
    const fileType = `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8`;
    const fileExtension = '.xlsx';

    const ExportTo = (dataExport, filenameExport) => {
        const ws = XLSX.utils.json_to_sheet(dataExport);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, filenameExport + fileExtension);
    }

    return (
        <>
            <button type="button" className="btn button-outline" onClick={(e) => ExportTo(data, filename)}>
                <span>XLSX</span>
            </button>
        </>
    )
}

export default exportFile;