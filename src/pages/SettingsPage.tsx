import React, { useState, useRef } from 'react';
import { useProgress } from '../hooks/useProgress';
import { Modal } from '../components/layout/Modal';
import { 
  Settings, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Unlock, 
  RotateCcw, 
  Download, 
  Upload, 
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    resetProgress, 
    exportProgressJSON, 
    importProgressJSON 
  } = useProgress();

  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      updateSettings({ theme: 'light' });
    } else {
      document.documentElement.classList.add('dark');
      updateSettings({ theme: 'dark' });
    }
  };

  const handleExport = () => {
    const jsonStr = exportProgressJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `irregular_verbs_360_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = importProgressJSON(content);
        setImportStatus(res);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-8 h-8 text-brand-500" />
          <span>Cài đặt ứng dụng</span>
        </h1>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Tùy chỉnh giao diện, âm thanh, mức độ thử thách và quản lý tiến độ học tập.
        </p>
      </div>

      {/* Settings Panel */}
      <div className="glass-card p-6 space-y-6">
        {/* Theme & Audio */}
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Giao diện & Âm thanh
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">Giao diện Tối / Sáng</span>
              <span className="text-xs text-slate-500">Chuyển đổi giữa chế độ Light mode và Dark mode</span>
            </div>
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-200"
            >
              <Sun className="w-5 h-5 hidden dark:block" />
              <Moon className="w-5 h-5 block dark:hidden" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">Âm thanh hiệu ứng</span>
              <span className="text-xs text-slate-500">Phát âm thanh khi chọn đáp án đúng/sai</span>
            </div>
            <button
              onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`p-3 rounded-xl transition-colors ${
                settings.soundEnabled ? 'bg-brand-500 text-white' : 'bg-slate-200 text-slate-500'
              }`}
            >
              {settings.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Learning Preferences */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Tùy chọn luyện tập
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">Mở khóa toàn bộ 18 Màn học</span>
              <span className="text-xs text-slate-500">Cho phép truy cập tự do tất cả các màn để thử nghiệm</span>
            </div>
            <button
              onClick={() => updateSettings({ unlockAllLevels: !settings.unlockAllLevels })}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                settings.unlockAllLevels
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {settings.unlockAllLevels ? 'Đã mở tất cả' : 'Theo tiến độ'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">Hiển thị nghĩa tiếng Việt</span>
              <span className="text-xs text-slate-500">Hiện nghĩa tiếng Việt khi luyện tập</span>
            </div>
            <button
              onClick={() => updateSettings({ showVietnameseMeaning: !settings.showVietnameseMeaning })}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                settings.showVietnameseMeaning
                  ? 'bg-brand-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
              }`}
            >
              {settings.showVietnameseMeaning ? 'Hiển thị' : 'Ẩn nghĩa'}
            </button>
          </div>
        </div>

        {/* Data Backup & Reset */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Quản lý dữ liệu tiến độ
          </h3>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExport}
              className="py-3 px-5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" /> Xuất dữ liệu JSON (Backup)
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="py-3 px-5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-2 transition-colors"
            >
              <Upload className="w-4 h-4" /> Nhập lại tiến độ từ tệp JSON
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {importStatus && (
            <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
              importStatus.success ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
            }`}>
              {importStatus.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              <span>{importStatus.message}</span>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setConfirmResetOpen(true)}
              className="py-3 px-5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Reset toàn bộ tiến độ học tập
            </button>
          </div>
        </div>

        {/* Dataset Source Info */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
            <Info className="w-4 h-4 text-brand-500" />
            <span>Nguồn dữ liệu & Bản quyền</span>
          </div>
          <p>
            Bộ dữ liệu 360 Động từ bất quy tắc được biên soạn và chuẩn hóa dựa trên các nguồn từ điển tiếng Anh mở uy tín (WordNet, Wiktionary). 
            Ứng dụng sử dụng giấy phép Open Access hoàn toàn miễn phí cho mục đích học tập.
          </p>
          <p className="font-semibold text-slate-400">Phiên bản ứng dụng: Irregular Verbs 360 v1.0.0 Pro</p>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmResetOpen}
        onClose={() => setConfirmResetOpen(false)}
        title="Xác nhận Reset Tiến độ"
      >
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-500 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Bạn có chắc chắn muốn xóa toàn bộ lịch sử học tập, sổ từ sai và điểm số không? Thao tác này KHÔNG THỂ hoàn tác!
          </p>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setConfirmResetOpen(false)}
              className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-xs text-slate-700 dark:text-slate-300"
            >
              Hủy bỏ
            </button>
            <button
              onClick={() => {
                resetProgress();
                setConfirmResetOpen(false);
              }}
              className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md"
            >
              Xác nhận Reset
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
