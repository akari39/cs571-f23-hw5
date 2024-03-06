import { useContext, useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import BadgerBudsSummary from "./BadgerBudSummary";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";

export default function BadgerBudsBasket(props) {
    const buds = useContext(BadgerBudsDataContext);
    const [selectedCatIds, setSelectedCatIds] = useState([]);
    const [adoptedCatIds, setAdoptedCatIds] = useState([]);

    useEffect(() => {
        checkAdoptedCatIds();
        checkSavedCatIds();
    }, [buds]);

    function checkAdoptedCatIds() {
        const adoptedCatIds = getStorageItem("adoptedCatIds");
        if (adoptedCatIds === null) {
            setAdoptedCatIds([]);
            return;
        }
        setAdoptedCatIds(adoptedCatIds);
    }

    function checkSavedCatIds() {
        const savedCatIds = getStorageItem("savedCatIds");
        if (savedCatIds === null) {
            setSelectedCatIds([]);
            return;
        }
        setSelectedCatIds(savedCatIds);
    }

    function getStorageItem(key) {
        const json = sessionStorage.getItem(key);
        if (json === undefined || json === null) {
            return null;
        }
        const array = JSON.parse(json);
        if (array === undefined || array === null) {
            return null;
        }
        return array;
    }

    function adopt(cat) {
        const adoptedCatIds = getStorageItem('adoptedCatIds') ?? [];
        adoptedCatIds.push(cat.id);
        sessionStorage.setItem('adoptedCatIds', JSON.stringify(adoptedCatIds));
        checkAdoptedCatIds();
        alert(`Thank you for adopting ${cat.name}! 💕🐱`);
    }

    const displayBuds = buds
        .filter((bud) => {
            return selectedCatIds.includes(bud.id) && !adoptedCatIds.includes(bud.id);
        });

    return <div>
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        <Container fluid>
            <Row>
                {
                    displayBuds.length === 0 ? "You have no buds in your basket! " :
                        displayBuds
                            .map((bud) => {
                                return <BadgerBudsSummary props={bud}
                                    onSave={() => {
                                        checkSavedCatIds();
                                    }}
                                    onAdopt={() => {
                                        adopt(bud);
                                    }}
                                />;
                            })
                }
            </Row>
        </Container>
    </div>
}