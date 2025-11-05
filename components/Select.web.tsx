export default function Select({ val, setVal, options }: any) {
  return (
    <>
      <select
        value={val}
        onChange={(e) => setVal(e.target.value)}
        // @ts-ignore
        style={{
          fontFamily: "Nunito",
          width: "40%",
          height: 50,
          textAlign: "center",
          fontSize: 30,
          borderRadius: 15,
          backgroundColor: "#f5f5f5",
          margin: 20,
        }}
      >
        {options.map((option: any) => (
          <option
            key={option.value}
            value={option.value}
            style={{ fontSize: 15 }}
          >
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
