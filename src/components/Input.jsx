// Input.js
export function Input({ payload, handleChange }) {
    return (
        <>
            {["name", "email", "password", "passwordConfirm"].map((field, idx) => (
                <div key={idx} className="flex flex-col mb-3">
                    <label className="text-xs  font-500 mb-2" htmlFor={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </label>
                    <input
                        type={field.includes('password') ? 'password' : 'text'}
                        id={field}
                        name={field}
                        className="p-3 h-[45px] xs:placeholder:text-xs xs:placeholder:text-black lg:placeholder:text-gray lg:placeholder:text-xs bg-transparent placeholder:text-sm text-[16px] rounded-md border lg:border-gray xs:border-gray-dark w-full outline-none"
                        value={payload[field]}
                        onChange={handleChange}
                        placeholder={`Enter your ${field}`}
                        required
                    />
                </div>
            ))}
        </>
    );
}
export function LoginInput({ payload, handleChange }) {
    return (
        <>
            {["email", "password"].map((field, idx) => (
                <div key={idx} className="flex flex-col mb-3">
                    <label className="text-xs  font-500 mb-2" htmlFor={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </label>
                    <input
                        type={field.includes('password') ? 'password' : 'text'}
                        id={field}
                        name={field}
                        className="p-3 h-[45px] xs:placeholder:text-xs xs:placeholder:text-black lg:placeholder:text-gray lg:placeholder:text-xs bg-transparent placeholder:text-sm text-[16px] rounded-md border lg:border-gray xs:border-gray-dark w-full outline-none"
                        value={payload[field]}
                        onChange={handleChange}
                        placeholder={`Enter your ${field}`}
                        required
                    />
                </div>
            ))}
        </>
    );
}


export const Inputs = ({ label, type, name, onChange, placeholder, value }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            className="p-3 h-[45px] text-xs placeholder:text-black lg:placeholder:text-gray lg:placeholder:text-xs bg-transparent placeholder:text-sm text-[16px] rounded-md border lg:border-gray border-gray-dark w-full outline-none"
        />
    </div>
);
