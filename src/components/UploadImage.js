import React from 'react'
import { Button, Input, Label } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import './UploadImage.scss'

import noImage from "../../../assets/img/no-image.png"

const UploadImage = ({ type, disabled = true, preview, dimensions, className, onSaveImage }) => {

    const [fileUpload, setFileUpload] = React.useState(null)
    const [filePreview, setFilePreview] = React.useState(noImage)

    React.useEffect(() => {

        if (preview === false){
            setFilePreview(noImage)
        } else if (!!preview) {
            setFilePreview(preview)
        }
    }, [preview])

    React.useEffect(() => {
        if (disabled) {
            setFileUpload(null)
            setFilePreview(noImage)
        }
    }, [disabled])

    const onChangeImage = (event) => {

        const url_image = URL.createObjectURL(event.target.files[0])
        setFileUpload(event.target.files[0])
        setFilePreview(url_image)
    }

    return (
        <div className={"upload-image " + className || ''}>
            <img
                alt=""
                className="image"
                src={filePreview}
                width={dimensions ? dimensions.width : 200}
                height={dimensions ? dimensions.height : 200}
            />
            <div className="buttons">

                <Label type="button" className={"ripple btn-raised btn-primary" + (!disabled ? "" : " readonly")}>
                    <Input type="file"
                           className="ripple btn-raised btn-primary mt-20"
                           onChange={(event) => onChangeImage(event)}
                    />
                    <FontAwesomeIcon className="icon" icon="upload"/>
                    &nbsp;Carregar
                </Label>

                <Button
                    type="button"
                    className={"ripple btn-raised btn-success" + (!!fileUpload ? "" : " readonly")}
                    onClick={() => onSaveImage(fileUpload, type)}
                >
                    <FontAwesomeIcon className="icon" icon="share"/>
                    &nbsp;Enviar
                </Button>
            </div>
        </div>
    )
}

export default UploadImage