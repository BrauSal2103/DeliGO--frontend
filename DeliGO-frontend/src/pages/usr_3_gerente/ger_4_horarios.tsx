"use client"

import { useState } from "react"
import { Clock, Calendar, Save, RotateCcw, CheckCircle, Plus, Trash2 } from "lucide-react"

interface TimeSlot {
  start: string
  end: string
}

interface DaySchedule {
  isOpen: boolean
  slots: TimeSlot[]
}

interface Schedule {
  [key: string]: DaySchedule
}

interface SpecialDate {
  id: string
  date: string
  name: string
  isOpen: boolean
  slots: TimeSlot[]
}

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<Schedule>({
    monday: { isOpen: true, slots: [{ start: "09:00", end: "22:00" }] },
    tuesday: { isOpen: true, slots: [{ start: "09:00", end: "22:00" }] },
    wednesday: { isOpen: true, slots: [{ start: "09:00", end: "22:00" }] },
    thursday: { isOpen: true, slots: [{ start: "09:00", end: "22:00" }] },
    friday: { isOpen: true, slots: [{ start: "09:00", end: "23:00" }] },
    saturday: { isOpen: true, slots: [{ start: "10:00", end: "23:00" }] },
    sunday: { isOpen: true, slots: [{ start: "10:00", end: "21:00" }] },
  })

  const [specialDates, setSpecialDates] = useState<SpecialDate[]>([
    {
      id: "1",
      date: "2024-12-25",
      name: "Navidad",
      isOpen: false,
      slots: [],
    },
    {
      id: "2",
      date: "2024-01-01",
      name: "Año Nuevo",
      isOpen: false,
      slots: [],
    },
    {
      id: "3",
      date: "2024-02-14",
      name: "San Valentín",
      isOpen: true,
      slots: [{ start: "12:00", end: "23:59" }],
    },
  ])

  const [showSaveMessage, setShowSaveMessage] = useState(false)
  const [activeTab, setActiveTab] = useState("regular")

  const dayNames = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
  }

  const toggleDay = (day: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isOpen: !prev[day].isOpen,
      },
    }))
  }

  const updateTimeSlot = (day: string, slotIndex: number, field: "start" | "end", value: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.map((slot, index) => (index === slotIndex ? { ...slot, [field]: value } : slot)),
      },
    }))
  }

  const addTimeSlot = (day: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { start: "09:00", end: "17:00" }],
      },
    }))
  }

  const removeTimeSlot = (day: string, slotIndex: number) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((_, index) => index !== slotIndex),
      },
    }))
  }

  const addSpecialDate = () => {
    const newDate: SpecialDate = {
      id: Date.now().toString(),
      date: "",
      name: "",
      isOpen: true,
      slots: [{ start: "09:00", end: "22:00" }],
    }
    setSpecialDates((prev) => [...prev, newDate])
  }

  const updateSpecialDate = (
    id: string,
    field: keyof SpecialDate,
    value: string | boolean | TimeSlot[]
  ) => {
    setSpecialDates((prev) => prev.map((date) => (date.id === id ? { ...date, [field]: value } : date)))
  }

  const removeSpecialDate = (id: string) => {
    setSpecialDates((prev) => prev.filter((date) => date.id !== id))
  }

  const saveSchedule = () => {
    // Aquí se guardarían los horarios en la base de datos
    setShowSaveMessage(true)
    setTimeout(() => setShowSaveMessage(false), 3000)
  }

  const resetToDefault = () => {
    setSchedule({
      monday: { isOpen: true, slots: [{ start: "09:00", end: "22:00" }] },
      tuesday: { isOpen: true, slots: [{ start: "09:00", end: "22:00" }] },
      wednesday: { isOpen: true, slots: [{ start: "09:00", end: "22:00" }] },
      thursday: { isOpen: true, slots: [{ start: "09:00", end: "22:00" }] },
      friday: { isOpen: true, slots: [{ start: "09:00", end: "23:00" }] },
      saturday: { isOpen: true, slots: [{ start: "10:00", end: "23:00" }] },
      sunday: { isOpen: true, slots: [{ start: "10:00", end: "21:00" }] },
    })
  }

  return (
    <div className="w-screen h-screen bg-gray-50 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Horarios de Atención</h1>
                <p className="text-gray-600">Configura los horarios de apertura y cierre</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={resetToDefault}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restablecer</span>
              </button>
              <button
                onClick={saveSchedule}
                className="flex items-center space-x-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSaveMessage && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mx-6 mt-4">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <p className="text-green-700">Horarios guardados exitosamente</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("regular")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "regular"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Horarios Regulares
            </button>
            <button
              onClick={() => setActiveTab("special")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "special"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Fechas Especiales
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "regular" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Horarios Semanales</h2>
                  <div className="space-y-6">
                    {Object.entries(schedule).map(([day, daySchedule]) => (
                      <div key={day} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-medium text-gray-900">
                              {dayNames[day as keyof typeof dayNames]}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => toggleDay(day)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  daySchedule.isOpen ? "bg-orange-600" : "bg-gray-200"
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    daySchedule.isOpen ? "translate-x-6" : "translate-x-1"
                                  }`}
                                />
                              </button>
                              <span className={`text-sm ${daySchedule.isOpen ? "text-green-600" : "text-gray-500"}`}>
                                {daySchedule.isOpen ? "Abierto" : "Cerrado"}
                              </span>
                            </div>
                          </div>
                          {daySchedule.isOpen && (
                            <button
                              onClick={() => addTimeSlot(day)}
                              className="flex items-center space-x-1 px-3 py-1 text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                              <span className="text-sm">Agregar Horario</span>
                            </button>
                          )}
                        </div>

                        {daySchedule.isOpen && (
                          <div className="space-y-3">
                            {daySchedule.slots.map((slot, slotIndex) => (
                              <div key={slotIndex} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-md">
                                <div className="flex items-center space-x-2">
                                  <label className="text-sm text-gray-600">Desde:</label>
                                  <input
                                    type="time"
                                    value={slot.start}
                                    onChange={(e) => updateTimeSlot(day, slotIndex, "start", e.target.value)}
                                    className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <label className="text-sm text-gray-600">Hasta:</label>
                                  <input
                                    type="time"
                                    value={slot.end}
                                    onChange={(e) => updateTimeSlot(day, slotIndex, "end", e.target.value)}
                                    className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                  />
                                </div>
                                {daySchedule.slots.length > 1 && (
                                  <button
                                    onClick={() => removeTimeSlot(day, slotIndex)}
                                    className="p-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "special" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Fechas Especiales</h2>
                    <button
                      onClick={addSpecialDate}
                      className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Agregar Fecha</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {specialDates.map((specialDate) => (
                      <div key={specialDate.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                            <input
                              type="date"
                              value={specialDate.date}
                              onChange={(e) => updateSpecialDate(specialDate.id, "date", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                            <input
                              type="text"
                              value={specialDate.name}
                              onChange={(e) => updateSpecialDate(specialDate.id, "name", e.target.value)}
                              placeholder="Ej: Navidad, Año Nuevo"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                          </div>
                          <div className="flex items-end justify-between">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateSpecialDate(specialDate.id, "isOpen", !specialDate.isOpen)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  specialDate.isOpen ? "bg-orange-600" : "bg-gray-200"
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    specialDate.isOpen ? "translate-x-6" : "translate-x-1"
                                  }`}
                                />
                              </button>
                              <span className={`text-sm ${specialDate.isOpen ? "text-green-600" : "text-gray-500"}`}>
                                {specialDate.isOpen ? "Abierto" : "Cerrado"}
                              </span>
                            </div>
                            <button
                              onClick={() => removeSpecialDate(specialDate.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {specialDate.isOpen && (
                          <div className="space-y-3">
                            {specialDate.slots.map((slot, slotIndex) => (
                              <div key={slotIndex} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-md">
                                <div className="flex items-center space-x-2">
                                  <label className="text-sm text-gray-600">Desde:</label>
                                  <input
                                    type="time"
                                    value={slot.start}
                                    onChange={(e) => {
                                      const newSlots = [...specialDate.slots]
                                      newSlots[slotIndex] = { ...slot, start: e.target.value }
                                      updateSpecialDate(specialDate.id, "slots", newSlots)
                                    }}
                                    className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <label className="text-sm text-gray-600">Hasta:</label>
                                  <input
                                    type="time"
                                    value={slot.end}
                                    onChange={(e) => {
                                      const newSlots = [...specialDate.slots]
                                      newSlots[slotIndex] = { ...slot, end: e.target.value }
                                      updateSpecialDate(specialDate.id, "slots", newSlots)
                                    }}
                                    className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    {specialDates.length === 0 && (
                      <div className="text-center py-12">
                        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay fechas especiales</h3>
                        <p className="text-gray-600 mb-4">Agrega fechas especiales como feriados o eventos</p>
                        <button
                          onClick={addSpecialDate}
                          className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors mx-auto"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Agregar Primera Fecha</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
