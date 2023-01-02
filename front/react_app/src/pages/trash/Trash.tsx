import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import CycleCard from "./TrashedCycleCard";
import Layout from "../../components/Layout";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../../components/modal/DeleteModal";
import { RootState } from "../../redux/store";
import { setErasedCycles } from "../../redux/erasedCyclesSlice";
import { CycleIfc } from "../../utils/cycle.interface";
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
      const data: CycleIfc[] = await (
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
      {modalState.visible && <DeleteModal></DeleteModal>}
    </>
  );
};

export default Trash;
