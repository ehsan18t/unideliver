'use client'

import React, { useState, useEffect } from 'react'
import Toggle from '@/components/common/Toggle'
import { useFetchAll, useUpdate } from '@/hooks'

const Settings = () => {
  const { updateItem } = useUpdate()
  const { data: orders } = useFetchAll('orders')
  const { data: settingsCloud } = useFetchAll('settings')
  const [totalOrders, setTotalOrders] = useState()
  const [totalIncome, setTotalIncome] = useState()
  const [settings, setSettings] = useState()

  useEffect(() => {
    if (settingsCloud) {
      setSettings(settingsCloud[0])
    }
  }, [settingsCloud])

  useEffect(() => {
    if (orders) {
      setTotalOrders(orders.length)
      const income = orders.reduce((acc, order) => {
        return acc + order.deliveryCharge
      }, 0)
      setTotalIncome(income)
    }
  }, [orders])

  const handleToggle = async (state, action) => {
    let updatedSettings = { ...settings }

    if (action === 'isTakingOrders') {
      updatedSettings.isTakingOrders = state
    } else if (action === 'allowAllMail') {
      updatedSettings.allowAllMail = state
    }

    console.log(state)
    console.log(updatedSettings)

    await updateItem('settings', updatedSettings.id, updatedSettings)
    setSettings(updatedSettings) // Update the local state with the updated settings
  }

  return (
    <div className="mx-10 my-4">
      <h1 className="text-3xl text-center flex justify-center items-center p-5 font-semibold">
        Settings
      </h1>
      <div className="flex gap-5 justify-between items-center">
        <div className="w-1/2 bg-gray-100 p-5 m-5 rounded-xl shadow text-center text-2xl">
          Total Orders
          <div className="text-red-400 font-semibold">{totalOrders}</div>
        </div>
        <div className="w-1/2 bg-gray-100 p-5 m-5 rounded-xl shadow text-center text-2xl">
          Total Income
          <div className="text-red-400 font-semibold">{totalIncome}</div>
        </div>
      </div>
      {settings ? (
        <div className="bg-gray-100 p-5 m-5 rounded-xl shadow flex flex-col gap-4">
          <div className="flex gap-4">
            <Toggle
              onChange={async (state) => handleToggle(state, 'allowAllMail')}
              value={settings.allowAllMail}
            />{' '}
            <span className="text-lg"> Accept only University Mail </span>
          </div>
          <div className="flex gap-4">
            <Toggle
              onChange={async (state) => handleToggle(state, 'isTakingOrders')}
              value={settings.isTakingOrders}
            />{' '}
            <span className="text-lg"> Taking Orders </span>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 p-5 m-5 rounded-xl shadow">
          {' '}
          Loading...{' '}
        </div>
      )}
    </div>
  )
}

export default Settings
