import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface Level {
  id: string;
  label: string;
  color: string;
  desc: string;
}

interface LevelSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  selectedLevel: string;
  onSelectLevel: (levelId: string) => void;
}

const LevelSelectorModal: React.FC<LevelSelectorModalProps> = ({ visible, onClose, selectedLevel, onSelectLevel }) => {
  const levels: Level[] = [
    { id: "A1", label: "Principiante A1", color: "#FF6B6B", desc: "Básico" },
    { id: "A2", label: "Elemental A2", color: "#FF9E6D", desc: "Pre-intermedio" },
    { id: "B1", label: "Intermedio B1", color: "#4ECDC4", desc: "Intermedio" },
    { id: "B2", label: "Intermedio Alto B2", color: "#45B7D1", desc: "Avanzado" },
    { id: "C1", label: "Avanzado C1", color: "#96CEB4", desc: "Experto" },
    { id: "C2", label: "Maestría C2", color: "#FFEAA7", desc: "Nativo" },
  ];

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 bg-black/50 justify-center items-center p-5">
        <View className="bg-white rounded-3xl w-full max-w-[400px] p-6 shadow-lg shadow-black/10">
          <View className="mb-6">
            <Text className="text-3xl font-bold text-gray-900 text-center">Selecciona tu nivel</Text>
            <Text className="text-xl text-gray-600 text-center mt-2">Las lecciones se adaptarán a este nivel</Text>
          </View>

          {levels.map((level) => {
            const isSelected = selectedLevel === level.id;

            return (
              <TouchableOpacity
                key={level.id}
                className={`
                  flex-row justify-between items-center
                  p-4 my-1.5 rounded-2xl border
                  ${isSelected ? "bg-amber-50 border-amber-200 scale-[1.02]" : "bg-gray-50 border-gray-100"}
                `}
                style={{ borderLeftWidth: 4, borderLeftColor: level.color }}
                onPress={() => {
                  onSelectLevel(level.id);
                  onClose();
                }}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center">
                  <View
                    className="w-10 h-10 rounded-full justify-center items-center"
                    style={{ backgroundColor: level.color }}
                  >
                    <Text className="text-white text-2xl font-bold">{level.id}</Text>
                  </View>
                  <View className="ml-3">
                    <Text className="text-xl font-semibold text-gray-800">{level.label}</Text>
                    <Text className="text-xl text-gray-600 mt-0.5">{level.desc}</Text>
                  </View>
                </View>

                {isSelected && <MaterialCommunityIcons name="check-circle" size={24} color={level.color} />}
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            className="mt-5 p-4 items-center bg-gray-100 rounded-2xl active:bg-gray-200"
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text className="text-xl font-semibold text-gray-600">Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LevelSelectorModal;
