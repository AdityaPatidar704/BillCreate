export function InputComponent({labelName,classNameLabel,labelInput,type,name,placeholder,classNameInput,...rest}){
    return(
        <>
        <label
                htmlFor={labelName?labelName:undefined}
                  className={classNameLabel?classNameLabel:"block text-gray-600"}
                >
                  {labelInput?labelInput:undefined}
                </label>
                <input
                    {...rest}
                //   onBlur={handleDateBlur}
                //   onChange={handleKeyUp}
                //  onFocus={handleFoucus}
                  type={type}
                //   id="challandate"
                  name={name}
                  placeholder={placeholder?placeholder:undefined}
                //   value={dt}
                //   required
                className={classNameInput?classNameInput:"w-full p-2 border rounded"}
                />
        </>
    )
}