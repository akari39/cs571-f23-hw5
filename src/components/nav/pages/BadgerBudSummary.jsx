import { useEffect, useState } from "react";
import { Button, Carousel, Col, Image } from "react-bootstrap";

export default function BadgerBudsSummary(props) {
    const [showMore, setShowMore] = useState(false);

    const prop = props.props;
    const onAdopt = props.onAdopt;
    const adoptMode = onAdopt !== undefined && onAdopt !== null;
    const firstImgId = prop.imgIds[0];
    const catFirstImgUrl = `https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${firstImgId}`;

    function toggleSaveCat() {
        var savedCatIdsJson = sessionStorage.getItem("savedCatIds");
        var savedCatIds = [];
        if (savedCatIdsJson !== undefined && savedCatIdsJson !== null) {
            savedCatIds = JSON.parse(savedCatIdsJson);
        }
        if (adoptMode) {
            savedCatIds = savedCatIds.filter((savedCatId) => savedCatId !== prop.id);
        } else {
            savedCatIds.push(prop.id);
        }
        sessionStorage.setItem("savedCatIds", JSON.stringify(savedCatIds));
        alert(`${prop.name} has been ${adoptMode ? 'removed from' : 'added to'} your basket!`);
        props.onSave();
    }

    return <Col xs={12} sm={6} md={4} lg={3} xl={3}>
        <div style={
            {
                borderStyle: "solid",
                borderColor: "#E3E3E3",
                borderRadius: "7px",
                borderWidth: "1px",
                margin: "16px",
                overflow: "hidden",
            }
        }>
            {showMore ? <Carousel>
                {
                    prop.imgIds.map((imgId) => {
                        return <Carousel.Item>
                            <Image src={`https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${imgId}`} style={
                                {
                                    borderRadius: "4px",
                                    width: "100%",
                                    height: "250px",
                                    objectFit: "cover",
                                }
                            } rounded />
                        </Carousel.Item>;
                    })
                }
            </Carousel> : <Image src={catFirstImgUrl} style={
                {
                    borderRadius: "4px",
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                }
            } rounded />}
            <div style={{ margin: "8px", }}>
                <h2>{prop.name}</h2>
                {!showMore ? null : <><p>{prop.gender}</p>
                    <p>{prop.breed}</p>
                    <p>{`${Math.floor(prop.age / 10)} year(s) and ${prop.age % 10} month(s) old`}</p>
                    {prop.description === undefined ? null : <p>{prop.description}</p>}</>}
            </div>
            <Col style={{
                padding: "4px",
                display: "flex",
                backgroundColor: "#f8f8f8",
                borderBottomRightRadius: "4px",
                borderBottomLeftRadius: "4px",
            }}>
                <Button variant={adoptMode ? "success" : "primary"} style={{ flex: "1", margin: "4px", }} onClick={() => {
                    adoptMode ? onAdopt() : setShowMore(!showMore);
                }}>{adoptMode ? "💕 Adopt" : `Show ${showMore ? "Less" : "More"}`}</Button>
                <Button variant="secondary" style={{ flex: "1", margin: "4px", }} onClick={() => {
                    toggleSaveCat();
                }}>{adoptMode ? 'Unselect' : '❤️ Save'}</Button>
            </Col>
        </div>
    </Col>;
}