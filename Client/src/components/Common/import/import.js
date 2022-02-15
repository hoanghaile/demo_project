import React, { useEffect } from 'react';
import * as XLSX from 'xlsx';
import userApi from '../../../api/User/userApi';
import './import.css'

const importFile = () => {
    // useEffect(() => {
        
    // })

    const col = (obj, index) => {
        return (obj[Object.keys(obj)[index]])
    }

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file)
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: "buffer" });
                const wbName = wb.SheetNames[0];
                const ws = wb.Sheets[wbName];
                const data = XLSX.utils.sheet_to_json(ws);
                resolve(data);
            };
            fileReader.onerror = (err) => {
                reject(err);
            }
        });
        promise.then((d) => {
            const result = d.map(async (e, k) => {
                const users = {
                    fullname: col(e, 1),
                    phone: col(e, 2),
                    email: col(e, 3),
                    gender: col(e, 4),
                    address: col(e, 5),
                    passport: col(e, 6),
                    nationality: col(e, 7),
                    nation: col(e, 8),
                    position: col(e, 9),
                    work: col(e, 10)
                };
                await userApi.addUser(users)
                return (users)
            });
            console.log(result);
        })
    }
    return (
        <>
            <div className="mr-5">
                <label htmlFor="importFile" className="custom-file-label">import</label>
                <input
                    onChange={(e) => {
                        const file = e.target.files[0];
                        readExcel(file)
                    }}
                    name="file" type="file" id="importFile" className="custom-file-input" />
            </div>
        </>
    )
}

export default importFile;