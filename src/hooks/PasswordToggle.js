import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'

export default function PasswordToggle() {
  const [visible, setVisibility] = useState(false);

  const Icon = <FontAwesomeIcon icon = { visible ? faEye : faEyeSlash}
    onClick={ () => setVisibility( visibility => !visibility)}/>;

  const InputType = visible ? "text" : "password";

  return [InputType, Icon]
}
