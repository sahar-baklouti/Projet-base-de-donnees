import abc

from database.sql_conection_manager import SqlConnectionManager


class TableCreationInterface(abc.ABC):
    table_name: str

    @staticmethod
    @abc.abstractmethod
    def create_table(connector: SqlConnectionManager):
        ...

    @staticmethod
    @abc.abstractmethod
    def init_table(connector: SqlConnectionManager):
        ...


