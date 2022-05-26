import {$host, $authHost} from '../../http/createAxios'
import {useDispatch, useSelector} from 'react-redux';
import {setBrands, setDevices, setTypes} from '../../store/reducers/deviceReducer';
import {useCallback, useEffect} from 'react';
import {setMessage} from '../../store/reducers/messageReducer';

export const useDeviceAPI = () => {

  const device = useSelector(state => state.device)
  const dispatch = useDispatch()


  const createType = useCallback(async (type) => {
    const {data} = await $authHost.post('api/type', type)
    dispatch(setTypes(data))
  }, [dispatch])

  const fetchTypes = useCallback(async () => {
    const {data} = await $host.get('api/type')

    dispatch(setTypes(data))
  }, [dispatch])

  const createBrand = useCallback(async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    dispatch(setBrands(data))
  }, [dispatch])

  const fetchBrands = useCallback(async () => {
    const {data} = await $host.get('api/brand')
    dispatch(setBrands(data))
  }, [dispatch])

  const createDevice = useCallback(async (device) => {
    const {data} = await $authHost.post('api/device', device)
    dispatch(setDevices(data))
  }, [dispatch])

  const fetchDevices = useCallback(async (typeId = device.selectedType.id, brandId = device.selectedBrand.id, page = device.page, limit = device.limit) => {
    const {data} = await $host.get('api/device', {params: {typeId, brandId, page, limit}})
    dispatch(setDevices(data))
  }, [dispatch, device.selectedType.id, device.selectedBrand.id, device.page, device.limit])

  const fetchDeviceById = useCallback(async (id) => {
    try {
      const {data} = await $host.get('api/device/' + id)
      return data
    } catch (e) {
      dispatch(setMessage(e.message))
    }

  }, [dispatch])

  useEffect(() => {
    fetchDevices()
  }, [device.page, device.selectedType, device.selectedBrand, fetchDevices])


  const fetchAll = useCallback(async () => {
    await fetchDevices()
    await fetchBrands()
    await fetchTypes()
  }, [fetchDevices, fetchBrands, fetchTypes])

  return {fetchDevices, createDevice, createBrand, fetchBrands, createType, fetchTypes, fetchDeviceById, fetchAll}
}
