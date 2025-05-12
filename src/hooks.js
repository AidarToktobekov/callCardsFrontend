import { useState } from 'react';
import axiosApi from './axiosApi.js';
import { exportToExcel } from './excelExporter.js';

export const useExportExcel = () => {
  const [loadingExport, setLoadingExport] = useState(false);

  const fetchCardsForUpload = async ({
    type,
    date,
    reasons,
    solutions,
    employees,
    list,
  }) => {
    setLoadingExport(true);
    let listCards;

    if (type === 'Неактивка') {
      listCards = list.map((item) => ({
        Айди_Аккаунта: item.account_id,
        Вызов_От: item.call_from,
        Комментарий: item.comment,
        Дата_Создания: item.created_at,
        ФИО: item.full_name,
        ID: item.id,
        ip_address: item.ip_address || '',
        ip_olt: item.ip_olt || '',
        mac_address: item.mac_address || '',
        mac_onu: item.mac_onu || '',
        n_result_id: item.n_result_id || '',
        Адресс: item.address,
        Личный_счет: item.ls_abon,
        Тел_Номер: item.phone_number.join(', '),
        Причина: item.reason.title,
        Решение: item.solution?.title || '',
        Сип: item.sip,
      }));
    } else if (type === 'Карточки') {
      const { data: cards } = await axiosApi.get(`/cards?page_size=10000000
                ${date?.createdAt && date?.finishedAt ? `&start_date=${date.createdAt}&end_date=${date.finishedAt}` : ''}
                ${reasons?.length ? `&reason=${reasons}` : ''}
                ${solutions?.length ? `&solution=${solutions}` : ''}
                ${employees?.length ? `&sip=${employees}` : ''}
            `);

      listCards = cards.result.map((item) => ({
        Айди_Аккаунта: item.account_id,
        Вызов_От: item.call_from,
        Комментарий: item.comment,
        Дата_Создания: item.created_at,
        ФИО: item.full_name,
        ID: item.id,
        ip_address: item.ip_address || '',
        ip_olt: item.ip_olt || '',
        mac_address: item.mac_address || '',
        mac_onu: item.mac_onu || '',
        n_result_id: item.n_result_id || '',
        Адресс: item.address,
        Личный_счет: item.ls_abon,
        Тел_Номер: item.phone_number.join(', '),
        Причина: item.reason.title,
        Решение: item.solution?.title || '',
        Сип: item.sip,
      }));
    } else if (type === 'Повторные звонки') {

      listCards = list.map((item) => ({
        Адресс: item.address,
        Кол_во: item.count,
        Личный_счет: item.ls_abon,
        Тел_Номер: item.phone_number.join(', '),
        Причина: item.reason?.title,
        Решение: item.solution?.title,
      }));
    }
    exportToExcel(listCards, type);
    setLoadingExport(false);
  };

  return {
    loadingExport,
    fetchCardsForUpload,
  };
};

export const useFetchEmployeeForEdit = () => {
  const [employeeForEdit, setEmployeeForEdit] = useState();
  const [employeeForEditLoading, setEmployeeForEditLoading] = useState(false);

  const fetchEmployeeForEdit = async (id) => {
    setEmployeeForEditLoading(true);
    try {
      const req = await axiosApi(`/users/${id}`);
      const res = await req.data;
      setEmployeeForEdit({
        ...(res?.[0] || {}),
        password: '',
      });
    } catch (e) {
      console.log(e);
    } finally {
      setEmployeeForEditLoading(false);
    }
  };

  return {
    employeeForEdit,
    employeeForEditLoading,
    fetchEmployeeForEdit,
  };
};
