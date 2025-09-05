import { useEffect, useState } from "react";
import "./CargoAssignPage.scss";
import { Button } from "../../../shared/ui/button";
import { useAppDispatch } from "../../../hooks/dispatch.ts";
import { useAppSelector } from "../../../hooks/rootState.ts";
import { assignCargo, fetchSlots, fetchCargo } from "../../../features/slots/model/slotsSlice.ts";

export const CargoAssignPage = () => {
  const dispatch = useAppDispatch();
  const { slots, cargo, loading, error } = useAppSelector((state) => state.slots);

  const [activeCell, setActiveCell] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchSlots());
    dispatch(fetchCargo());
  }, [dispatch]);

  const handleAssign = (slotId: number, cargoId: number | null) => {
    dispatch(assignCargo({ slotId, cargoId }));
  };

  const slotPositions: Record<number, string> = {
    1: "cargo-assign-wrapper__button--1x1-1",
    2: "cargo-assign-wrapper__button--1x1-2",
    3: "cargo-assign-wrapper__button--1x1-3",
    4: "cargo-assign-wrapper__button--1x1-4",
    5: "cargo-assign-wrapper__button--1x1-5",
    6: "cargo-assign-wrapper__button--1x1-6",
    7: "cargo-assign-wrapper__button--1x1-7",
    8: "cargo-assign-wrapper__button--1x1-8",
    9: "cargo-assign-wrapper__button--1x2-1",
    10: "cargo-assign-wrapper__button--1x2-2",
    11: "cargo-assign-wrapper__button--1x2-3",
    12: "cargo-assign-wrapper__button--1x2-4",
    13: "cargo-assign-wrapper__button--2x2-1",
    14: "cargo-assign-wrapper__button--2x2-2",
  };


  return (
    <div className="cargo-assign-wrapper">
      {/* Лифт */}
      <div className="cargo-assign-wrapper__lift">
        {slots.map((slot) => (
          <button
            key={slot.id}
            className={`
        cargo-assign-wrapper__button 
        ${slotPositions[slot.id] ?? ""} 
        ${slot.cargoId ? "cargo-assign-wrapper__button--filled" : ""}
        ${activeCell === slot.id ? "cargo-assign-wrapper__button--active" : ""}
      `}
            onClick={() => setActiveCell(slot.id)}
          >
            {slot.id}
          </button>
        ))}
      </div>


      {/* Товары */}
      <div className="cargo-assign-wrapper__cargo">
        {loading && <p>Загрузка...</p>}
        {error && <p style={{color: "red"}}>{error}</p>}

        {activeCell ? (
          <>
            {(() => {
              const slot = slots.find((s) => s.id === activeCell);
              if (!slot) return null;

              const items =
                cargo?.[slot.size.toLowerCase() as "small" | "medium" | "large"] ?? [];

              return (
                <>
                  <div className="cargo-list__header">Товары для слота {slot.id} размером {slot.size}</div>
                  {items.map((c) => {
                    const isAssigned = slot.cargoId === c.id; // проверяем, лежит ли этот товар в ячейке

                    return (
                      <div key={c.id} className="cargo-assign-wrapper__cargo__item">
                        <div>{c.name}</div>
                        <div>Вес: {c.weight}</div>
                        <Button
                          icon={<span>{isAssigned ? "-" : "+"}</span>}
                          onClick={() =>
                            handleAssign(slot.id, isAssigned ? null : c.id)
                          }
                        />
                      </div>
                    );
                  })}
                </>
              );
            })()}
          </>
        ) : (
          <h3>Выберите ячейку</h3>
        )}
      </div>
    </div>
  );
};
