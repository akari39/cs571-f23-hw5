import { Container, Row } from "react-bootstrap";
import BadgerBudsSummary from "./BadgerBudSummary";
import { useContext, useState, useEffect } from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";

export default function BadgerBudsAdoptable(props) {
    const buds = useContext(BadgerBudsDataContext);
    const [selectedCatIds, setSelectedCatIds] = useState([]);
    const [adoptedCatIds, setAdoptedCatIds] = useState([]);

    useEffect(() => {
        checkSavedCatIds();
        checkAdoptedCatIds();
    }, [buds]);

    function checkSavedCatIds() {
        const savedCatIds = getStorageItem("savedCatIds");
        if (savedCatIds === null) {
            setSelectedCatIds([]);
            return;
        }
        setSelectedCatIds(savedCatIds);
    }

    function checkAdoptedCatIds() {
        const adoptedCatIds = getStorageItem("adoptedCatIds");
        if (adoptedCatIds === null) {
            setAdoptedCatIds([]);
            return;
        }
        setAdoptedCatIds(adoptedCatIds);
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

    const displayBuds = buds
        .filter((bud) => {
            return !selectedCatIds.includes(bud.id) && !adoptedCatIds.includes(bud.id);
        });

    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        <Container fluid>
            <Row>
                {
                    displayBuds.length === 0 ? "No buds are available for adoption! " :
                        displayBuds.map((bud) => {
                            return <BadgerBudsSummary props={bud} onSave={() => {
                                checkSavedCatIds();
                            }} />;
                        })
                }
            </Row>
        </Container>
    </div>
}