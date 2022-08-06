import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import {UPLOAD_ENDPOINT} from "../models/Model";
import Axios from "axios";

export default function UploadCard() {
    const [enableButton, setEnableButton] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    const [fileSelected, setFileSelected] = useState<File>();
    const [dropDownList] = useState(["WAREHOUSE_CSV", "PRODUCT_CSV", "INVENTORY_CSV"]);
    let [selectOption, setSelectOption] = useState("INVENTORY_CSV");
    let [uploadedComplete, setUploadedComplete] = useState<Boolean>(false);

    const list = dropDownList.map(dropDownList => dropDownList);

    const handleChange = function(e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        console.log(e.target.files);
        if(!fileList) return;
        if(!(fileList[0].name.endsWith(".csv"))) {
            setShowMessage(true);
            return
        }

        setShowMessage(false);
        setFileSelected(fileList[0]);
        setEnableButton(false);
    }

    const uploadFile = async function(e: React.MouseEvent<HTMLSpanElement, MouseEvent> | React.TouchEvent) {
        if(fileSelected) {
            const formData = new FormData();
            formData.append("fileType", selectOption);
            formData.append('file', fileSelected, fileSelected.name);
            await Axios.post(UPLOAD_ENDPOINT, formData, {
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000"
                }
            }).catch((err) => console.log(err)).catch(err => setUploadedComplete(false));
            setUploadedComplete(true)
        }
    }

    const handleSelect = function(e: any) {
        setSelectOption(e.target.value);
    }

    const content = () => {

        if(uploadedComplete) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {fileSelected && fileSelected.name}</p>
                    <p>File Type: {fileSelected && fileSelected.type}</p>
                    <p>
                        Uploaded Status: uploadedComplete
                    </p>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }
    return (
        <Card className={"mt-2 mb-2"}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h5">
                    <div className={"titleColor"}>Document Management</div>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <div>
                        <p className={"lead"}>Upload Your Data Sets Using this feature.</p>
                        {uploadedComplete && content()}
                        <p className={"strong"}>Select the type of worksheet to upload.</p>
                        <select className="form-select" onChange={handleSelect} defaultValue={"INVENTORY_CSV"}>
                            {
                                list.map((address, key) => <option key={key} value={address}>{address}</option>)
                            }
                        </select>
                        <br/>
                        { showMessage && <p className={"red"}>Only CSV Files Are Supported.</p>}
                        <input type="file" onChange={handleChange}/>
                        <br/>
                        <button onClick={uploadFile} className={"btn btn-primary mt-5"} disabled={enableButton}>
                            Save
                        </button>
                    </div>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">

                </Typography>
            </CardContent>
        </Card>
    );
}