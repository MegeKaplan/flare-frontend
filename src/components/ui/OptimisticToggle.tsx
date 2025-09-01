"use client";
import { useState, ReactNode } from "react";

type ActionFn = () => Promise<any>;

interface OptimisticActionProps {
  initialState?: boolean
  action: ActionFn
  undoAction?: ActionFn
  children: (active: boolean, loading: boolean) => ReactNode
  className?: string
}

export default function OptimisticToggle({
  initialState = false,
  action,
  undoAction,
  children,
  className,
}: OptimisticActionProps) {
  const [active, setActive] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    const previousState = active;
    setActive(!active);
    setLoading(true);
    try {
      if (!previousState) await action();
      else if (undoAction) await undoAction();
    } catch (err) {
      setActive(previousState);
    } finally {
      setLoading(false);
    }
  };

  return <div className={className} onClick={handleClick}>{children(active, loading)}</div>;
}
