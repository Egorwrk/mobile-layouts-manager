import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import ToolsbarSelectors from 'components/EditorPageComponents/ToolsbarComponents/ToolsbarSelectors';
import ToolsbarButtons from 'components/EditorPageComponents/ToolsbarComponents/ToolsbarButtons';
import {emptyTemplate} from 'constants/emptyMockups';
import {addNewScreen} from 'store/templatesSlice';
import {EditorModeSwitcherType, Template} from 'types';

interface Props {
    template: Template
    setEditorModeSwitcher: React.Dispatch<React.SetStateAction<EditorModeSwitcherType>>
    editorModeSwitcher: EditorModeSwitcherType
    handleTypeSelect: (e: any) => void
    chosenNav: 'bottomTabs' | 'drawer' | null
    templateIndex: number
}

const Toolsbar = (props: Props) => {
    const [screenName, setScreenName] = useState<string>('')
    const dispatch = useDispatch()

    const okButtonPressed = () => {
        if (props.editorModeSwitcher === 'newScreen' && screenName) {
            let screenWithThisNameAlreadyExist = false
            for (let i = 0; i < props.template.screens.length; i++) {
                if (props.template.screens[i].name === screenName) {
                    screenWithThisNameAlreadyExist = true
                }
            }
            if (!screenWithThisNameAlreadyExist) {
                const actionPayload = {
                    templateIndex: props.templateIndex,
                    screenIndex: 0,
                    screen: {
                        ...emptyTemplate.screens[0],
                        name: screenName
                    }
                }
                dispatch(addNewScreen(actionPayload))
                setScreenName('')
                props.setEditorModeSwitcher(null)
            } else {
                alert('screen with this name already exist')
            }
        }
        if (props.editorModeSwitcher === 'navigator' || props.editorModeSwitcher === 'multisetMode') {
            props.setEditorModeSwitcher(null)
        }
    }

    return (
        <div className='toolsbar'>
            <ToolsbarButtons setEditorModeSwitcher={props.setEditorModeSwitcher} templateIndex={props.templateIndex} />

            <ToolsbarSelectors
                editorModeSwitcher={props.editorModeSwitcher}
                chosenNav={props.chosenNav}
                handleTypeSelect={props.handleTypeSelect}
                screenName={screenName}
                setScreenName={setScreenName}
            />

            <div className='prevOkBtnSeparator'/>

            {props.editorModeSwitcher
                ? <button
                    className='okButton'
                    onClick={() => okButtonPressed()}>Ok</button>
                : null
            }
        </div>
    )
}

export default Toolsbar