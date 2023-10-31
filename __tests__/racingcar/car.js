import Car from '../../src/racingcar/car.js';
import RacingStateService from '../../src/services/racing.state.service.js';
import Util from '../../src/utils/util.js';

describe('경주할 자동차 이름을 입력받는다.', () => {
  test('이름은 쉼표(,)를 기준으로 구분한다.', () => {
    // given
    const input = 'car1, car2';

    // when
    const car = new Car(new RacingStateService());
    const result = car.isValidValue(input);

    // then
    expect(result).toBeTruthy();
  });

  test.each([
    'car1',
    'car1 car2',
    '1234567',
    'car1, car1',
    '',
  ])('이름에 대한 예외 처리', input => {
    // when
    const car = new Car();
    const result = car.isValidValue(input);

    // then
    expect(result).toBeFalsy();
  });
});

describe('경기 차수별 각 자동차를 전진 또는 멈춘다.', () => {
  test('0 ~ 9의 무작위 값을 구한 후, 그 값이 4 이상이면 전진한다.', () => {
    // given
    Util.RandomNumber = jest.fn(() => 4);

    // when
    const car = new Car(new RacingStateService());
    const result = car.isMoveForward();

    // then
    expect(result).toBeTruthy();
  });

  test('0 ~ 9의 무작위 값을 구한 후, 그 값이 4 미만이면 멈춘다.', () => {
    // given
    Util.RandomNumber = jest.fn(() => 3);

    // when
    const car = new Car(new RacingStateService());
    const result = car.isMoveForward();

    // then
    expect(result).toBeFalsy();
  });
});
