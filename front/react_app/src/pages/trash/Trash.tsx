import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CycleCard from "./CycleCard";
import Layout from "../../components/Layout";
import { CycleIfc } from "../../utils/cycle.interface";
import Header from "./Header";
import { useSelector } from "react-redux";
import { ModalIfc } from "../../redux/modalSlice";
import DeleteModal from "../../components/modal/DeleteModal";

const Trash = () => {
  const [cycles, setCycles] = useState<CycleIfc[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const modalState: ModalIfc = useSelector((state: any) => state.modal.value);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/cycles/trashed/1");
      setCycles(response.data);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <Layout>
        <Header></Header>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "50px",
            }}
          >
            <FontAwesomeIcon
              icon={faCircleNotch}
              spin
              style={{ fontSize: "50px" }}
            />
          </div>
        ) : (
          cycles.map((ele) => (
            <div key={ele.id}>
              <CycleCard element={ele}></CycleCard>
            </div>
          ))
        )}
      </Layout>
      {modalState.visible && (
        <DeleteModal cycles={cycles} setCycles={setCycles}></DeleteModal>
      )}
    </>
  );
};

export default Trash;
