import React, { useState } from 'react';

const SUPPORT_URL = 'https://omg10.com/4/11383384';

export const SupportAdButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-[9998] rounded-full bg-brand-600 px-4 py-3 text-sm font-extrabold text-white shadow-xl shadow-slate-900/20 transition hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-500/30"
        aria-haspopup="dialog"
      >
        Ủng hộ
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 p-4"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Ủng hộ tác giả"
            className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-xl font-black">Ủng hộ tác giả</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Bạn có thể ủng hộ bằng cách mở một quảng cáo. Công cụ vẫn dùng
              bình thường, không bắt buộc xem.
            </p>
            <div className="mt-5 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                Để sau
              </button>
              <a
                href={SUPPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-brand-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-700"
              >
                Mở quảng cáo
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
