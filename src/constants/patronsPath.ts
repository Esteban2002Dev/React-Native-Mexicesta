export const wavyPath = (width: number, height: number) => {
    return `M0 ${height / 5}
    Q${width / 10} ${height / 3}
    ${width / 5} ${height / 4}
    T${2 * width / 5} ${height / 3}
    T${width / 2} ${height / 4}
    T${3 * width / 5} ${height / 3}
    T${4 * width / 5} ${height / 4}
    T${width} ${height / 3}`
}

export const crossPath = (width: number, height: number) => {
    return `M0,0 L${width},${height} M${width},0 L0,${height}`;
};