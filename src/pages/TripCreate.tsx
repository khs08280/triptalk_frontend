import TripCreateModal from "@components/TripCreateModal";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createTrip, TripFormValues, TripResponse } from "@/api/TripApi";
import { AxiosError } from "axios";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Visibility } from "@/types";

const TripCreate = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TripFormValues>({
    defaultValues: {
      title: "",
      startDate: "",
      endDate: "",
      location: "",
      visibility: Visibility.PRIVATE,
    },
  });
  const navigate = useNavigate();

  const closeModal = () => {
    navigate("/trip");
  };
  const mutation = useMutation<TripResponse, AxiosError, TripFormValues>({
    mutationFn: async (tripData: TripFormValues) => {
      return createTrip(tripData);
    },
    onSuccess: (data) => {
      console.log(data);
      navigate(`/trip/${data.data.id}`);
      console.log("성공적으로 여행 생성:", data);
    },
  });

  const onSubmit = (data: TripFormValues) => {
    console.log(data);

    // 날짜 유효성 검사
    if (new Date(data.startDate) > new Date(data.endDate)) {
      alert("종료 날짜는 시작 날짜 이후여야 합니다.");
      return;
    }

    mutation.mutate(data);
  };

  return (
    <TripCreateModal onClose={closeModal}>
      <div className="mb-4 flex justify-between">
        <h2 className="mb-4 text-xl font-bold">여행 계획 생성</h2>
        <span
          onClick={closeModal}
          className="material-symbols-rounded h-fit w-auto cursor-pointer rounded-lg p-1 hover:bg-blue-100 hover:opacity-70"
        >
          <CloseRoundedIcon />
        </span>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-col space-y-3"
      >
        <div>
          <FormControl fullWidth error={!!errors.title}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "제목은 필수 값입니다." }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="title"
                  variant="outlined"
                  placeholder="여행 제목"
                  error={!!errors.title}
                />
              )}
            />
            {errors.title && (
              <FormHelperText>{errors.title.message}</FormHelperText>
            )}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth error={!!errors.startDate}>
            <Controller
              name="startDate"
              control={control}
              rules={{
                required: "시작 날짜는 필수 값입니다.",
                validate: (value) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const selectedDate = new Date(value);
                  return (
                    selectedDate >= today ||
                    "시작 날짜는 오늘 또는 이후여야 합니다."
                  );
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="startDate"
                  type="date"
                  variant="outlined"
                  error={!!errors.startDate}
                />
              )}
            />
            {errors.startDate && (
              <FormHelperText>{errors.startDate.message}</FormHelperText>
            )}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth error={!!errors.endDate}>
            <Controller
              name="endDate"
              control={control}
              rules={{
                required: "종료 날짜는 필수 값입니다.",
                validate: {
                  futureOrPresent: (value) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const selectedDate = new Date(value);
                    return (
                      selectedDate >= today ||
                      "종료 날짜는 오늘 또는 이후여야 합니다."
                    );
                  },
                  afterStartDate: (value, { startDate }) => {
                    if (!startDate) return true;
                    return (
                      new Date(value) >= new Date(startDate) ||
                      "종료 날짜는 시작 날짜 이후여야 합니다."
                    );
                  },
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="endDate"
                  type="date"
                  variant="outlined"
                  error={!!errors.endDate}
                />
              )}
            />
            {errors.endDate && (
              <FormHelperText>{errors.endDate.message}</FormHelperText>
            )}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth error={!!errors.location}>
            <Controller
              name="location"
              control={control}
              rules={{ required: "여행 장소는 필수 값입니다." }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="location"
                  variant="outlined"
                  placeholder="여행 장소"
                  error={!!errors.location}
                />
              )}
            />
            {errors.location && (
              <FormHelperText>{errors.location.message}</FormHelperText>
            )}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth error={!!errors.visibility}>
            <Controller
              name="visibility"
              control={control}
              rules={{ required: "공개/비공개는 필수 값입니다." }}
              render={({ field }) => (
                <Select
                  {...field}
                  id="visibility"
                  variant="outlined"
                  error={!!errors.visibility}
                  onClick={(e) => e.stopPropagation()}
                >
                  <MenuItem value={Visibility.PUBLIC}>공개</MenuItem>
                  <MenuItem value={Visibility.PRIVATE}>비공개</MenuItem>
                </Select>
              )}
            />
            {errors.visibility && (
              <FormHelperText>{errors.visibility.message}</FormHelperText>
            )}
          </FormControl>
        </div>
        <Button type="submit" variant="contained" color="primary">
          저장
        </Button>
      </form>
    </TripCreateModal>
  );
};

export default TripCreate;
