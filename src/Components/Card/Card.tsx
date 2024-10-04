import {Card as CardProps} from "./Types";
import moment from "moment";

const cardStyle: React.CSSProperties = {
    backgroundColor: "#979b98",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
    padding: "16px",
    marginBottom: "16px",
    width: "75%",
    minHeight: "200px",
    maxHeight: "200px",
    transition: "box-shadow 0.3s ease",
    display: "flex",
    flexDirection: "column",
    flex: "1",
}

const cardContentStyle: React.CSSProperties = {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column",
}

const titleStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: "bold",
    color: "black",
    marginBottom: "12px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "wrap"
}

const descriptionStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "black",
    marginBottom: "16px",
    lineHeight: "1.4",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
}

const footerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
    color: "black",
    marginTop: "10px",
}



export const Card: React.FC<CardProps> = (card: CardProps) => {
    return (
        <>
            <div className="card" style={cardStyle} data-testid={"card"}>
                <div style={cardContentStyle}>
                    <h3 style={titleStyle}>{card.title}</h3>
                    <p style={descriptionStyle}>{card.description}</p>
                </div>
                <div style={footerStyle}>
                    <span>{moment().format('L')}</span>
                </div>
            </div>
        </>
    )
}