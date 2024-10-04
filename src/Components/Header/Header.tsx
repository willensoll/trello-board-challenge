const headerStyle: React.CSSProperties = {
    gridRow: "1",
    display: "flex",
    height: "20%"
}


export const Header = () => {
    return (
        <div style={headerStyle} data-testid="header">
            <h1>Trello Board!</h1>
        </div>
    )
}

