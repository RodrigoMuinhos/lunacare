import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ClipboardList, TestTube, Stethoscope, X, Send, Check, Lock, Upload, File, Trash2 } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

interface ActionModalsProps {
  // Message Modal
  showMessageModal: boolean;
  setShowMessageModal: (show: boolean) => void;
  message: string;
  setMessage: (msg: string) => void;
  
  // Note Modal
  showNoteModal: boolean;
  setShowNoteModal: (show: boolean) => void;
  note: string;
  setNote: (note: string) => void;
  
  // Exams Modal
  showExamsModal: boolean;
  setShowExamsModal: (show: boolean) => void;
  
  // Care Plan Modal
  showCarePlanModal: boolean;
  setShowCarePlanModal: (show: boolean) => void;
  
  selectedPatientName?: string;
}

export const ActionModals: React.FC<ActionModalsProps> = ({
  showMessageModal,
  setShowMessageModal,
  message,
  setMessage,
  showNoteModal,
  setShowNoteModal,
  note,
  setNote,
  showExamsModal,
  setShowExamsModal,
  showCarePlanModal,
  setShowCarePlanModal,
  selectedPatientName,
}) => {
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* Message Modal */}
      <AnimatePresence>
        {showMessageModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMessageModal(false)}
              className="fixed inset-0 bg-black/50 z-[80] backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-4 lg:inset-0 m-auto max-w-2xl max-h-[90vh] lg:max-h-[600px] z-[90] overflow-hidden"
            >
              <div className="bg-white rounded-3xl h-full flex flex-col shadow-2xl">
                <div className="p-4 lg:p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F7C8E0]/20 flex items-center justify-center">
                        <MessageCircle size={20} className="text-[#F7C8E0]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Enviar Mensagem</h3>
                        <p className="text-sm text-gray-500">Para: {selectedPatientName}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowMessageModal(false)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <X size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Mensagem *
                      </label>
                      <textarea
                        placeholder="Digite sua mensagem aqui..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full min-h-[200px] p-4 rounded-xl border border-gray-300 focus:border-[#F7C8E0] focus:ring-2 focus:ring-[#F7C8E0]/20 outline-none resize-none"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-[#F7C8E0]/10 border border-[#F7C8E0]/30">
                      <p className="text-xs text-gray-600">
                        💡 <span className="font-medium">Dica:</span> A paciente receberá uma notificação assim que você enviar a mensagem.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 lg:p-6 border-t border-gray-200">
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowMessageModal(false)}
                      variant="outline"
                      className="flex-1 h-12 rounded-xl"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={() => {
                        console.log('Sending message:', message);
                        setMessage('');
                        setShowMessageModal(false);
                      }}
                      disabled={!message.trim()}
                      className="flex-1 h-12 bg-gradient-to-r from-[#F7C8E0] to-[#D9C2F0] text-white hover:opacity-90 rounded-xl disabled:opacity-50"
                    >
                      <Send size={16} className="mr-2" />
                      Enviar
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Note Modal */}
      <AnimatePresence>
        {showNoteModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNoteModal(false)}
              className="fixed inset-0 bg-black/50 z-[80] backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-4 lg:inset-0 m-auto max-w-2xl max-h-[90vh] lg:max-h-[600px] z-[90] overflow-hidden"
            >
              <div className="bg-white rounded-3xl h-full flex flex-col shadow-2xl">
                <div className="p-4 lg:p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#BFD7ED]/20 flex items-center justify-center">
                        <ClipboardList size={20} className="text-[#BFD7ED]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Adicionar Nota</h3>
                        <p className="text-sm text-gray-500">Paciente: {selectedPatientName}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowNoteModal(false)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <X size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Tipo de Nota
                      </label>
                      <select className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-[#BFD7ED] focus:ring-2 focus:ring-[#BFD7ED]/20 outline-none">
                        <option>Evolução Clínica</option>
                        <option>Observação</option>
                        <option>Exame Físico</option>
                        <option>Anamnese</option>
                        <option>Procedimento</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Nota Médica *
                      </label>
                      <textarea
                        placeholder="Exemplo: Paciente relata melhora dos sintomas após início do tratamento. Sem queixas no momento..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full min-h-[250px] p-4 rounded-xl border border-gray-300 focus:border-[#BFD7ED] focus:ring-2 focus:ring-[#BFD7ED]/20 outline-none resize-none"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-[#BFD7ED]/10 border border-[#BFD7ED]/30">
                      <div className="flex items-start gap-2">
                        <Lock size={16} className="text-[#BFD7ED] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-gray-800 mb-1">Nota Confidencial</p>
                          <p className="text-xs text-gray-600">
                            Esta nota é privada e ficará visível apenas para você no prontuário da paciente.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 lg:p-6 border-t border-gray-200">
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowNoteModal(false)}
                      variant="outline"
                      className="flex-1 h-12 rounded-xl"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={() => {
                        console.log('Saving note:', note);
                        setNote('');
                        setShowNoteModal(false);
                      }}
                      disabled={!note.trim()}
                      className="flex-1 h-12 bg-gradient-to-r from-[#BFD7ED] to-[#D9C2F0] text-white hover:opacity-90 rounded-xl disabled:opacity-50"
                    >
                      <Check size={16} className="mr-2" />
                      Salvar nota
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Exams Modal */}
      <AnimatePresence>
        {showExamsModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExamsModal(false)}
              className="fixed inset-0 bg-black/50 z-[80] backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-4 lg:inset-0 m-auto max-w-2xl max-h-[90vh] lg:max-h-[650px] z-[90] overflow-hidden"
            >
              <div className="bg-white rounded-3xl h-full flex flex-col shadow-2xl">
                <div className="p-4 lg:p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FFB347]/20 flex items-center justify-center">
                        <TestTube size={20} className="text-[#FFB347]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Solicitar Exames</h3>
                        <p className="text-sm text-gray-500">Paciente: {selectedPatientName}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowExamsModal(false)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <X size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Exames Ginecológicos
                      </label>
                      <div className="space-y-2">
                        {[
                          'Papanicolau',
                          'Ultrassom Transvaginal',
                          'Ultrassom Pélvico',
                          'Mamografia',
                          'Colposcopia',
                          'Vulvoscopia'
                        ].map((exam) => (
                          <label key={exam} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#FFB347] focus:ring-[#FFB347]" />
                            <span className="text-sm text-gray-700">{exam}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Exames Laboratoriais
                      </label>
                      <div className="space-y-2">
                        {[
                          'Hemograma Completo',
                          'Glicemia',
                          'Colesterol Total e Frações',
                          'Hormônios Tireoidianos (TSH, T4)',
                          'Dosagem Hormonal (FSH, LH, Estradiol, Progesterona)',
                          'Prolactina',
                          'Vitamina D',
                          'Ferritina'
                        ].map((exam) => (
                          <label key={exam} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#FFB347] focus:ring-[#FFB347]" />
                            <span className="text-sm text-gray-700">{exam}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Observações
                      </label>
                      <textarea
                        placeholder="Instruções especiais ou justificativa clínica..."
                        className="w-full min-h-20 p-4 rounded-xl border border-gray-300 focus:border-[#FFB347] focus:ring-2 focus:ring-[#FFB347]/20 outline-none resize-none"
                      />
                    </div>

                    {/* Upload de Guia de Exame */}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Enviar Guia de Exame
                      </label>
                      
                      {/* Drag and Drop Area */}
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`
                          relative border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all
                          ${isDragging 
                            ? 'border-[#FFB347] bg-[#FFB347]/10' 
                            : 'border-gray-300 hover:border-[#FFB347] hover:bg-gray-50'
                          }
                        `}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        
                        <div className="flex flex-col items-center gap-3 text-center">
                          <div className="w-12 h-12 rounded-xl bg-[#FFB347]/20 flex items-center justify-center">
                            <Upload size={24} className="text-[#FFB347]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 mb-1">
                              Clique ou arraste arquivos aqui
                            </p>
                            <p className="text-xs text-gray-500">
                              PDF, JPG ou PNG até 10MB
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Uploaded Files List */}
                      {uploadedFiles.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200"
                            >
                              <div className="w-8 h-8 rounded-lg bg-[#FFB347]/20 flex items-center justify-center flex-shrink-0">
                                <File size={16} className="text-[#FFB347]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(file.size / 1024).toFixed(2)} KB
                                </p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFile(index);
                                }}
                                className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center flex-shrink-0 transition-colors"
                              >
                                <Trash2 size={14} className="text-red-600" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 lg:p-6 border-t border-gray-200">
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowExamsModal(false)}
                      variant="outline"
                      className="flex-1 h-12 rounded-xl"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={() => {
                        console.log('Exams requested');
                        setShowExamsModal(false);
                      }}
                      className="flex-1 h-12 bg-gradient-to-r from-[#FFB347] to-[#FF8C42] text-white hover:opacity-90 rounded-xl"
                    >
                      <Send size={16} className="mr-2" />
                      Enviar solicitação
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Care Plan Modal */}
      <AnimatePresence>
        {showCarePlanModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCarePlanModal(false)}
              className="fixed inset-0 bg-black/50 z-[80] backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-4 lg:inset-0 m-auto max-w-2xl max-h-[90vh] lg:max-h-[700px] z-[90] overflow-hidden"
            >
              <div className="bg-white rounded-3xl h-full flex flex-col shadow-2xl">
                <div className="p-4 lg:p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FF8C42]/20 flex items-center justify-center">
                        <Stethoscope size={20} className="text-[#FF8C42]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Plano de Cuidado</h3>
                        <p className="text-sm text-gray-500">Paciente: {selectedPatientName}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowCarePlanModal(false)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <X size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Objetivo do Plano *
                      </label>
                      <Input
                        placeholder="Ex: Controle do ciclo menstrual e redução de cólicas"
                        className="h-12 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Período de Acompanhamento
                      </label>
                      <select className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20 outline-none">
                        <option>1 mês</option>
                        <option>3 meses</option>
                        <option>6 meses</option>
                        <option>12 meses</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Medicações Prescritas
                      </label>
                      <textarea
                        placeholder="Liste as medicações e posologia..."
                        className="w-full min-h-20 p-4 rounded-xl border border-gray-300 focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20 outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Orientações e Recomendações *
                      </label>
                      <textarea
                        placeholder="Ex: Manter alimentação balanceada, praticar exercícios físicos 3x/semana, hidratação adequada..."
                        className="w-full min-h-32 p-4 rounded-xl border border-gray-300 focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20 outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Sinais de Alerta
                      </label>
                      <textarea
                        placeholder="Informe quais sintomas requerem contato imediato..."
                        className="w-full min-h-20 p-4 rounded-xl border border-gray-300 focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20 outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Próximos Retornos
                      </label>
                      <Input
                        type="date"
                        className="h-12 rounded-xl"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-[#FF8C42]/10 border border-[#FF8C42]/30">
                      <p className="text-xs text-gray-600">
                        📋 <span className="font-medium">Nota:</span> Este plano ficará disponível no dashboard da paciente e poderá ser acompanhado por ela em tempo real.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 lg:p-6 border-t border-gray-200">
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowCarePlanModal(false)}
                      variant="outline"
                      className="flex-1 h-12 rounded-xl"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={() => {
                        console.log('Care plan saved');
                        setShowCarePlanModal(false);
                      }}
                      className="flex-1 h-12 bg-gradient-to-r from-[#FF8C42] to-[#CDE7BE] text-white hover:opacity-90 rounded-xl"
                    >
                      <Check size={16} className="mr-2" />
                      Salvar plano
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};