import { useState, useEffect, useCallback, useRef } from "react";
import { db } from "./firebase";
import {
  collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot,
  query, orderBy, serverTimestamp, setDoc
} from "firebase/firestore";

function useCollection(path, orderField = "createdAt", dir = "desc") {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const pathRef = useRef(path);
  pathRef.current = path;

  useEffect(() => {
    const q = query(collection(db, path), orderBy(orderField, dir));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, (err) => { console.error(err); setLoading(false); });
    return unsub;
  }, [path, orderField, dir]);

  const add = useCallback(async (data) => {
    await addDoc(collection(db, pathRef.current), { ...data, createdAt: serverTimestamp() });
  }, []);

  const update = useCallback(async (id, data) => {
    await updateDoc(doc(db, pathRef.current, id), data);
  }, []);

  const remove = useCallback(async (id) => {
    await deleteDoc(doc(db, pathRef.current, id));
  }, []);

  return { items, loading, add, update, remove };
}

function useSettings() {
  const [settings, setSettings] = useState({
    chemoRound: 0, totalChemo: 12, herceptinMonth: 0, totalHerceptin: 12,
    isResting: false, startDate: "2026-02-12",
  });
  const [loading, setLoading] = useState(true);
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const ref = doc(db, "settings", "app");
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) setSettings(snap.data());
      setLoading(false);
    });
    return unsub;
  }, []);

  const updateSettings = useCallback(async (data) => {
    const merged = { ...settingsRef.current, ...data };
    await setDoc(doc(db, "settings", "app"), merged, { merge: true });
  }, []);

  return { settings, loading, updateSettings };
}

export { useCollection, useSettings };
