// import { useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Box, Button, Container, Typography } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import { selectOneGlacier, selectOneGlacierLoading } from '../features/glacierGraph/glacierSlice.ts';
// import Spinner from '../components/UI/Spinner/Spinner.tsx';
// import GlacierGraph from '../features/glacierGraph/GlacierGraph.tsx';
// import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
// import { fetchGlacierById } from '../features/glacierGraph/glacierThunks.ts';
//
// const GlacierPage = () => {
//   const { id } = useParams<{ id: string }>(); // Получаем ID ледника из URL
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//
//   // Получение данных о леднике и состояния загрузки
//   const glacierData = useAppSelector(selectOneGlacier);
//   const loading = useAppSelector(selectOneGlacierLoading);
//
//   useEffect(() => {
//     if (id) {
//       dispatch(fetchGlacierById(id)); // Выполняем запрос для получения данных о леднике
//     }
//   }, [dispatch, id]);
//
//   const handleBackClick = () => {
//     navigate('/'); // Переход на домашнюю страницу
//   };
//
//   // Если данные загружаются, показываем спиннер
//   if (loading) return <Spinner />;
//
//   // Если ледник не найден, отображаем сообщение
//   if (!glacierData || glacierData.length === 0) {
//     return (
//       <Box sx={{ padding: 4 }}>
//         <Typography variant="h5">Glacier not found</Typography>
//       </Box>
//     );
//   }
//
//   return (
//     <Container maxWidth="lg">
//       {/* Кнопка "Назад" */}
//       <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 2 }}>
//         <Button
//           variant="text"
//           startIcon={<ArrowBackIosNewIcon />}
//           onClick={handleBackClick}
//           sx={{
//             color: '#555',
//             '&:hover': {
//               backgroundColor: 'transparent',
//               color: '#111',
//             },
//           }}
//         ></Button>
//       </Box>
//
//       {/* График ледника */}
//       <Box sx={{ marginTop: 2 }}>
//         <GlacierGraph
//           glacierData={glacierData}
//           glacierId={glacierData[0]?.glacier_id} // Передаем ID ледника
//         />
//       </Box>
//     </Container>
//   );
// };
//
// export default GlacierPage;

import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import GlacierGraph from '../features/glacierGraph/GlacierGraph.tsx';
import { GlacierData } from '../features/glacierGraph/glacier.ts';

const GlacierPage = () => {
  const { id } = useParams<{ id: string }>(); // Получаем ID ледника из URL
  const navigate = useNavigate();

  // Фильтрация данных по ID
  const glacierData = GlacierData.filter((data) => data.glacier_id === Number(id));

  const handleBackClick = () => {
    navigate('/'); // Переход на домашнюю страницу
  };

  // Если ледник не найден, отображаем сообщение
  if (glacierData.length === 0) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h5">Glacier not found</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Кнопка "Назад" */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 2 }}>
        <Button
          variant="text"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={handleBackClick}
          sx={{
            color: '#555',
            '&:hover': {
              backgroundColor: 'transparent',
              color: '#111',
            },
          }}
        ></Button>
      </Box>

      {/* График ледника */}
      <Box sx={{ marginTop: 2 }}>
        <GlacierGraph
          glacierData={glacierData} // Передаем данные ледника
          glacierId={glacierData[0]?.glacier_id} // Передаем ID ледника
        />
      </Box>
    </Container>
  );
};

export default GlacierPage;
