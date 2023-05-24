import React, {useState} from 'react';

import {useDispatch} from "react-redux";
import {addNewTemplate} from "redux/templatesSlice";

import {defaultTemplate} from "assets/tempConstants";
import {axiosApi} from "assets/axiosInstance";
import {Template} from "../../types";

interface Props {
    setShowNewTemplateModalCreator: React.Dispatch<React.SetStateAction<boolean>>
    templates: Template[]
}

const CreateNewTemplateModal = (props: Props) => {
    const [newTemplate, setNewTemplate] = useState<Template>(defaultTemplate);
    const dispatch = useDispatch()

    const saveTemplate = () => {
        if (newTemplate.name && newTemplate.devices.phone!.screens[0].name) {
            axiosApi.setTemplatesServer([...props.templates, newTemplate]).then((data) => {
                if (data === 'successful save') {
                    dispatch(addNewTemplate(newTemplate))
                    props.setShowNewTemplateModalCreator(false)
                } else {
                    alert(data)
                }
            })
        }
    }

    const changeTemplateName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTemplate({
                ...newTemplate,
                name: event.target.value
            }
        )
    }

    const changeScreenName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTemplate(
            {
                ...newTemplate,
                devices: {
                    phone: {
                        ...newTemplate.devices.phone!,
                        screens: [
                            {
                                ...newTemplate.devices.phone!.screens[0],
                                name: event.target.value
                            }
                        ]
                    },
                    tablet: null,
                    miniPhone: null
                }
            }
        )
    }

    return (
        <div className='createNewTemplateModal'>
            <span className='topPanel'>
                <button
                    className='exitBtn'
                    onClick={() => props.setShowNewTemplateModalCreator(false)}
                >exit</button>
            </span>
            <div className='createNewTemplateFormContainer'>
                <div className='createNewTemplateForm'>
                    <input
                        className='templateInputField'
                        value={newTemplate.name}
                        placeholder={'Template name'}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeTemplateName(event)}
                    />
                    <input
                        className='templateInputField'
                        value={newTemplate.devices.phone!.screens[0].name}
                        placeholder={'First screen name'}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeScreenName(event)}
                    />
                    <span className='templateModalSeparator'/>
                    <button
                        className='templateModalSaveBtn'
                        onClick={() => saveTemplate()}
                    >save</button>
                </div>
            </div>
        </div>
    )
}

export default CreateNewTemplateModal;