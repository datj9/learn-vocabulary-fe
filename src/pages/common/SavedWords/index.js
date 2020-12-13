import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedWordsStart } from "../../../redux/test/actions";

export default function SavedWords() {
    const dispatch = useDispatch();
    const { savedWords } = useSelector((state) => state.test);

    useEffect(() => {
        dispatch(getSavedWordsStart());
    }, [dispatch]);

    return <div>Bạn hiện đang lưu {savedWords.length} tư</div>;
}
