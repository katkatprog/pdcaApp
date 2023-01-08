import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import CycleCard from "./TrashedCycleCard";
import Layout from "../../components/Layout";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import DeleteCycleModal from "../cycle/DeleteCycleModal";
import { RootState } from "../../redux/store";
import { setErasedCycles } from "../../redux/erasedCyclesSlice";
import { Cycle } from "@prisma/client";
import { hideMenu } from "../../redux/menuSlice";
import { hideModal } from "../../redux/modalSlice";

const Trash = () => {
  const erasedCyclesState = useSelector(
    (state: RootState) => state.erasedCycles.value,
  );
  const modalState = useSelector((state: RootState) => state.modal.value);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(hideMenu());
    dispatch(hideModal());
    (async () => {
      const data: Cycle[] = await (
        await axios.get(`/api/cycles/trashed/${1}`)
      ).data;
      dispatch(setErasedCycles(data));
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <Layout>
        <Header></Header>
        {loading ? (
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
          erasedCyclesState.map((ele) => (
            <div key={ele.id}>
              <CycleCard element={ele}></CycleCard>
            </div>
          ))
        )}
      </Layout>
      {modalState.visible && <DeleteCycleModal></DeleteCycleModal>}
    </>
  );
};

export default Trash;
