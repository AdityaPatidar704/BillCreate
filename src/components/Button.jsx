export function ButtonComponent({type,className,value,label,children,...rest}){
    return(
        <button type={type?type:undefined} className={className} {...rest} value={value}>{label?label:undefined}{children?children:undefined}</button>
    )
}