import {createFeatureSelector, createSelector} from "@ngrx/store";
import {SettingsState} from "./settings.reducer";

export const selectSettingsDataState = createFeatureSelector<SettingsState>('settingsState');

export const selectSettingsData = createSelector(selectSettingsDataState, (state: SettingsState) => state
);
