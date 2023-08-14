import { useMemo } from "react";
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import { playersActions } from "../redux/reducers/Players.reducer";
import { authActions } from "../redux/reducers/Auth.reducer";

const actions = {
    ...playersActions,
    ...authActions
}

const useActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators(actions , dispatch), [dispatch])
}

export default useActions;